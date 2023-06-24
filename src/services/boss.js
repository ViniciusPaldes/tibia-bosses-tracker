import { useState, useEffect } from 'react';
import { getBosses } from './firebase';

export const useFetchBosses = () => {
  const [bosses, setBosses] = useState([]);

  useEffect(() => {
    const fetchBosses = async () => {
      try {
        const bossesCollection = await getBosses();
        const bossesData = bossesCollection.docs.map((doc) => {
          const bossData = doc.data();
          return { id: doc.id, ...bossData };
        });
        setBosses(bossesData);
      } catch (error) {
        console.error('Error fetching bosses from Firestore:', error);
      }
    };

    fetchBosses();
  }, []);

  return bosses;
};
