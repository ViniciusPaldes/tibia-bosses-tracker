import React from 'react';
import {
  saveKillStatisticsToFirestore,
  fetchBossesLastDayKilled,
} from '../services/firebase';

const AdminPage = () => {
  const handleSaveKillStatistics = () => {
    saveKillStatisticsToFirestore();
  };

  const handleFetchBossesLastDayKilled = () => {
    fetchBossesLastDayKilled();
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <button onClick={handleSaveKillStatistics}>Save Kill Statistics</button>
      <button onClick={handleFetchBossesLastDayKilled}>
        Fetch Bosses Last Day Killed
      </button>
    </div>
  );
};

export default AdminPage;
