import React from 'react';
import {
  saveKillStatisticsToFirestore,
  fetchBossesLastDayKilled,
  getDaysSinceLastKill,
  calculateBossChance,
} from '../services/firebase';

const AdminPage = () => {
  const handleSaveKillStatistics = () => {
    saveKillStatisticsToFirestore();
  };

  const handleFetchBossesLastDayKilled = () => {
    fetchBossesLastDayKilled();
  };

  const handleDaysSinceLastKill = () => {
    getDaysSinceLastKill();
  };

  const handleChance = () => {
    calculateBossChance();
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <button onClick={handleSaveKillStatistics}>Save Kill Statistics</button>
      <button onClick={handleFetchBossesLastDayKilled}>
        Fetch Bosses Last Day Killed
      </button>
      <button onClick={handleDaysSinceLastKill}>
        Get the last kill for a boss
      </button>
      <button onClick={handleChance}>
        Get chance
      </button>
    </div>
  );
};

export default AdminPage;
