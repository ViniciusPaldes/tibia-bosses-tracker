import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import bosses from './bosses.json';
import { useState, useEffect } from "react";
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

  console.log("Batch with boss data", bossData)

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
    console.log('Boss data saved successfully!');
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

    console.log('userId:', userId);
    console.log('bossId:', bossId);
    console.log('killed:', killed);
    console.log('loot:', loot);
    console.log('timestamp:', firebase.firestore.FieldValue.serverTimestamp());
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

export const addTimestampIntoBosses = (bossesData, checks) => {
  const updatedBosses = [...bossesData];

  checks.forEach((checkData) => {
    const bossId = checkData.bossId;
    const bossIndex = updatedBosses.findIndex((boss) => boss.id === bossId);

    if (bossIndex !== -1) {
      if (checkData.timestamp) { // Check if timestamp exists
        const timestamp = checkData.timestamp.toDate();
        if (!updatedBosses[bossIndex].timestamp || timestamp > updatedBosses[bossIndex].timestamp) {
          updatedBosses[bossIndex].timestamp = timestamp;
        }
      }
    }
  });

  return updatedBosses;
};

export const useFetchBosses = () => {
  const [bosses, setBosses] = useState([]);

  useEffect(() => {
    const fetchBosses = async () => {
      try {
        const bossesCollection = await firebase.firestore().collection('bosses').get();

        const unsubscribeChecks = firebase.firestore().collection('checks')
          .onSnapshot((snapshot) => {
            const checks = snapshot.docs.map((doc) => doc.data());
            setBosses((prevBosses) => addTimestampIntoBosses(prevBosses, checks));
          });

        const checksSnapshot = await firebase.firestore().collection('checks').get();
        const checks = checksSnapshot.docs.map((doc) => doc.data());

        setBosses(addTimestampIntoBosses(bossesCollection.docs.map((doc) => ({ id: doc.id, ...doc.data(), timestamp: null })), checks));

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
