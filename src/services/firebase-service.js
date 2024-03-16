import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useState, useEffect, useRef } from "react";
import { getChanceLabel } from 'utils/chances';
import { getTodaysTimestamp } from 'utils/date';

import bosses from './bosses.json';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const BASE_URL = process.env.REACT_APP_BASE_URL;

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
export const saveCheckToFirestore = async (userUid, bossId, killed, loot, userEmail) => {
  try {
    // Create a new Firestore document reference for the check
    const checkRef = db.collection('checks').doc();

    const res = await axios.get("https://api.ipify.org/?format=json");
    const ip = res?.data?.ip;

    // Create the check object with the provided data
    const checkData = {
      userUid,
      bossId,
      killed,
      loot,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Add server timestamp
      ip,
      userEmail,
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


 // Placeholder for processing API bosses - implement according to your needs
 const processApiBosses = (apiData, initialBosses) => {
  const flattenedApiBosses = Object.values(apiData).flat();
  return initialBosses.map((boss) => {
    const apiBoss = flattenedApiBosses.find(apiBoss => apiBoss.name.toLowerCase() === boss.name.toLowerCase());
    return {
      ...boss,
      chance: apiBoss?.chance || 0,
      lastSeen: apiBoss?.lastSeen || '',
      killedYesterday: apiBoss?.killedYesterday || 0,
      expectedIn: apiBoss?.expectedIn || '0',
      chanceLabel: getChanceLabel(apiBoss?.chance),
    };
  });
};

export const useFetchBosses = () => {
  const [bosses, setBosses] = useState([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;

    let unsubscribeChecks = () => {};
    const fetchAndSubscribe = async () => {
      try {
        const bossesCollectionPromise = firebase.firestore().collection('bosses').get();
        const apiDataPromise = axios.get(`${BASE_URL}/guild-stats`);
        const [bossesCollection, apiResponse] = await Promise.all([bossesCollectionPromise, apiDataPromise]);

        const initialBosses = bossesCollection.docs.map(doc => ({ id: doc.id, ...doc.data(), checks: [] }));
        const apiData = apiResponse.data;
        const processedBosses = processApiBosses(apiData, initialBosses); // Assume this function exists

        setBosses(processedBosses);

        const { start, end } = getTodaysTimestamp();
        
        unsubscribeChecks = firebase.firestore().collection('checks')
          .where('timestamp', '>=', start)
          .where('timestamp', '<', end)
          .orderBy('timestamp', 'desc')
          .onSnapshot(snapshot => {
            const checks = snapshot.docs.map(doc => doc.data());
            setBosses(prevBosses => addChecksIntoBosses(prevBosses, checks)); // Assume this function exists
          });

      } catch (error) {
        console.error('Error fetching bosses:', error);
      }
    };

    fetchAndSubscribe();

    return () => {
      unsubscribeChecks();
    };
  }, []);

  return bosses;
};


export const socialLogin = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};


export const onAuthStateChanged = (setUser) => { 
  return firebase.auth().onAuthStateChanged(setUser);
}

export const logout = () => {
  firebase.auth().signOut();
};
