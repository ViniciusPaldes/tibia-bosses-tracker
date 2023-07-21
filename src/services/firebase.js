import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import bosses from './bosses.json';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useDebouncedCallback } from 'use-debounce';

const firebaseConfig = {
  apiKey: "AIzaSyCFsrRbVJgtrlZPZE3iJh5uKE8oHW657G8",
  authDomain: "tibia-boss-tracker-6caba.firebaseapp.com",
  databaseURL: "https://tibia-boss-tracker-6caba-default-rtdb.firebaseio.com",
  projectId: "tibia-boss-tracker-6caba",
  storageBucket: "tibia-boss-tracker-6caba.appspot.com",
  messagingSenderId: "735049719990",
  appId: "1:735049719990:web:9fc9f05e7a219b0a130617",
  measurementId: "G-4YJ1L3EX8N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const addBossData = (bossData) => {
  const batch = db.batch();
  const bossesCollection = db.collection('bosses');

  bossData.forEach((boss) => {
    const docRef = bossesCollection.doc();
    batch.set(docRef, boss);
  });

  return batch.commit();
};


export const saveBossData = async (filteredBosses) => {
  try {
    const batch = firebase.firestore().batch();

    filteredBosses.forEach((boss) => {
      const bossRef = firebase.firestore().collection('bosses').doc(boss.race);
      batch.set(bossRef, boss);
    });

    await batch.commit();
  } catch (error) {
    console.error('Error saving boss data:', error);
  }
};

export const manuallyAddBosses = async () => {
  try {
    bosses.forEach((boss) => {
      firebase.firestore().collection('bosses').add(boss);
    });
  } catch (error) {
    console.error('Error fetching or adding bosses:', error);
  }
};

// Function to save check data to Firestore
export const saveCheckToFirestore = async (userId, bossId, killed, loot) => {
  try {
    // Create a new Firestore document reference for the check
    const checkRef = db.collection('checks').doc();

    // Create the check object with the provided data
    const checkData = {
      userId,
      bossId,
      killed,
      loot,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() // Add server timestamp
    };

    // Save the check data to Firestore
    await checkRef.set(checkData);

    return checkRef.id; // Return the ID of the saved check document
  } catch (error) {
    throw new Error('Error saving check: ' + error.message);
  }
};

export const addChecksIntoBosses = (bossesData, checks) => {
  const updatedBosses = bossesData.map((boss) => ({
    ...boss,
    checks: checks.filter((check) => check.bossId === boss.id),
  }));
  return updatedBosses;
};


// Helper function to convert chance strings to numeric values
const convertChanceToNumber = (chance) => {
  switch (chance.toLowerCase()) {
    case 'high chance':
      return 1;
    case 'medium chance':
      return 0.5;
    case 'low chance':
      return 0.1;
    default:
      return 0;
  }
};

export const useFetchBosses = () => {
  const [bosses, setBosses] = useState([]);

  const fetchBosses = async () => {
    try {
      console.log("Calling bossesCollection")
      const bossesCollection = await firebase.firestore().collection('bosses').get();

      const unsubscribeChecks = firebase.firestore().collection('checks')
        .onSnapshot((snapshot) => {
          const checks = snapshot.docs.map((doc) => doc.data());
          setBosses((prevBosses) => addChecksIntoBosses(prevBosses, checks));
        });

      const checksSnapshot = await firebase.firestore().collection('checks').get();
      const checks = checksSnapshot.docs.map((doc) => doc.data());

      const updatedBosses = addChecksIntoBosses(
        bossesCollection.docs.map((doc) => ({ id: doc.id, ...doc.data(), timestamp: null })),
        checks
      );

      const response = await axios.get('https://checkboss-api.netlify.app/.netlify/functions/tibia-statistics');
      const apiBosses = response.data || {};

      const updatedBossesWithChance = updatedBosses.map((boss) => {
        const bossData = Object.values(apiBosses).flat().find((item) => item.name === boss.name);
        
        const currentProb = bossData ? convertChanceToNumber(bossData.chance) : 0;
        return { ...boss, chance: currentProb };
      });
      setBosses(updatedBossesWithChance);

      return () => {
        unsubscribeChecks();
      };
    } catch (error) {
      console.error('Error fetching bosses:', error);
    }
  };

  const debouncedFetchBosses = useDebouncedCallback(fetchBosses, 1000); // Adjust the debounce delay as needed

  useEffect(() => {
    debouncedFetchBosses();
  }, [debouncedFetchBosses]);

  return bosses;
};


export const useFetchBossesSimaCheck = () => {
  const [bosses, setBosses] = useState([]);

  useEffect(() => {
    const fetchBosses = async () => {
      try {
        const bossesCollection = await firebase.firestore().collection('bosses').get();

        const unsubscribeChecks = firebase.firestore().collection('checks')
          .onSnapshot((snapshot) => {
            const checks = snapshot.docs.map((doc) => doc.data());
            setBosses((prevBosses) => addChecksIntoBosses(prevBosses, checks));
          });

        const checksSnapshot = await firebase.firestore().collection('checks').get();
        const checks = checksSnapshot.docs.map((doc) => doc.data());

        const updatedBosses = addChecksIntoBosses(
          bossesCollection.docs.map((doc) => ({ id: doc.id, ...doc.data(), timestamp: null })),
          checks
        );

        const response = await axios.get('https://api.simacheck.com/server/lore/Venebra');
        const apiBosses = response.data || {}; // Set an empty object as default if the API response is undefined

        const updatedBossesWithChance = updatedBosses.map((boss) => {
          const bossData = Object.values(apiBosses).flat().find((item) => item.display_name === boss.name);
          
          const currentProb = bossData ? bossData.current_prob : "No";
          const color = bossData ? bossData.colour_frame : "0";
          return { ...boss, chance: currentProb, color };
        });

        setBosses(updatedBossesWithChance);

        return () => {
          unsubscribeChecks();
        };
      } catch (error) {
        console.error('Error fetching bosses from Firestore:', error);
      }
    };

    fetchBosses();
  }, []);

  return bosses;
};

export const saveKillStatisticsToFirestore = async () => {
  try {
    const response = await fetch('https://api.tibiadata.com/v3/killstatistics/Venebra');
    const data = await response.json();
    const currentDate = new Date().toISOString();

    // Save the response and current date to Firestore with the current date as the document name
    const firestore = firebase.firestore();
    await firestore.collection('killStatistics').doc(currentDate).set({
      data,
      currentDate,
    });

  } catch (error) {
    console.error('Error saving kill statistics to Firestore:', error);
  }
};

export const fetchBossesLastDayKilled = async () => {
  try {
    // Fetch all boss documents from the 'bosses' collection
    const firestore = firebase.firestore();
    const bossesQuerySnapshot = await firestore.collection('bosses').get();
    const bossesData = bossesQuerySnapshot.docs.map((doc) => doc.data());

    // Fetch bosses killed yesterday from the API
    const response = await axios.get('https://checkboss-api.netlify.app/.netlify/functions/tibia-statistics-yesterday');
    const bossesKilledYesterday = response.data;

    // Merge boss kills data with bosses collection
    const bossKills = bossesKilledYesterday.map((bossKilled) => {
      const boss = bossesData.find((boss) => boss.name === bossKilled.name);

      if (boss) {
        return {
          boss: boss,
          lastDayKilled: 1,
        };
      } else {
        return {};
      }
    });

    return bossKills.filter(Boolean);
  } catch (error) {
    console.error('Error fetching bosses last day killed:', error);
    return [];
  }
};

export const fetchBossesLastDayKilledSimaCheck = async () => {
  try {
    // Fetch all boss documents from the 'bosses' collection
    const firestore = firebase.firestore();
    const bossesQuerySnapshot = await firestore.collection('bosses').get();
    const bossesData = bossesQuerySnapshot.docs.map((doc) => doc.data());

    // Fetch bosses killed yesterday from the API
    const response = await axios.get('https://api.simacheck.com/server/Venebra/last_views');
    const bossesKilledYesterday = response.data;

    // Merge boss kills data with bosses collection
    const bossKills = bossesKilledYesterday.map((bossKilled) => {
      const boss = bossesData.find((boss) => boss.name === bossKilled.boss);

      if (boss) {
        return {
          boss: boss,
          lastDayKilled: 1,
        };
      } else {
        return {};
      }
    });

    return bossKills.filter(Boolean);
  } catch (error) {
    console.error('Error fetching bosses last day killed:', error);
    return [];
  }
};
export const getDaysSinceLastKill = async () => {
  try {
    const firestore = firebase.firestore();

    // Fetch all boss documents from the 'bosses' collection
    const bossesQuerySnapshot = await firestore.collection('bosses').get();
    const bossesData = bossesQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    // Fetch the kill statistics from Firestore
    const killStatisticsQuerySnapshot = await firestore.collection('killStatistics').get();
    const bossKills = [];

    killStatisticsQuerySnapshot.forEach((doc) => {
      const killStatistic = doc.data().data.killstatistics;
      
      if (killStatistic && killStatistic.entries) {
        killStatistic.entries.forEach((entry) => {
          const bossName = entry.race.toLowerCase().trim();

          // Find the boss in the 'bosses' data with matching name
          const boss = bossesData.find((boss) => boss.name.toLowerCase().trim() === bossName);

          if (boss && entry.last_day_killed >= 1) {
            const timestamp = doc.data().data?.information?.timestamp;
            const lastKillDate = new Date(timestamp).setHours(0, 0, 0, 0);
            const today = new Date().setHours(0, 0, 0, 0);
            const daysDiff = Math.round((today - lastKillDate) / (1000 * 60 * 60 * 24));

            bossKills.push({
              boss: boss,
              lastKillTimestamp: timestamp,
              daysSinceLastKill: daysDiff || 1,
            });
          }
        });
      }
    });
    return bossKills;
  } catch (error) {
    console.error('Error fetching boss kills:', error);
    return [];
  }
};

export const calculateBossChance = async (bossObject) => {
  try {
    const bossKills = await getDaysSinceLastKill();
    const calculatedBosses = bossKills.map((bossKill) => {
      const { boss, daysSinceLastKill } = bossKill;
      const { starting_day, end_day } = boss;

      if (daysSinceLastKill >= starting_day) {
        if  (daysSinceLastKill > end_day + 2) {
          return { ...boss, chance: 'Puff' };
        } else {
          return { ...boss, chance: 'High' };
        }
      } else if (
        daysSinceLastKill === starting_day - 1 ||
        daysSinceLastKill === end_day + 1
      ) {
        return { ...boss, chance: 'Medium', daysSinceLastKill };
      } else {
        return { ...boss, chance: 'No', daysSinceLastKill };
      }
    });

    if (bossObject) {
      const filteredBoss = calculatedBosses.filter(
        (boss) => boss.id === bossObject.id
      );
      return filteredBoss.length > 0 ? filteredBoss[0] : null;
    }

    return calculatedBosses;
  } catch (error) {
    console.error('Error calculating boss chance:', error);
    return [];
  }
};

export const getBossesFromFirestore = async () => {
  const firestore = firebase.firestore();

  try {
    const bossesCollection = await firestore.collection('bosses').orderBy('city').get();
    const bosses = bossesCollection.docs.map((doc) => doc.data());
    return JSON.stringify(bosses, null, 2);
  } catch (error) {
    return null;
  }
};

export default getBossesFromFirestore;
