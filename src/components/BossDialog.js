import React from 'react';

function BossDialog({ onClose }) {
  const handleMarkChecked = () => {
    // Logic to mark boss as checked
  };

  const handleKillBoss = () => {
    // Logic to handle boss kill
  };

  return (
    <div className="boss-dialog">
      <h2>Boss Dialog</h2>
      <button onClick={handleMarkChecked}>Mark as Checked</button>
      <button onClick={handleKillBoss}>Kill Boss</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default BossDialog;
