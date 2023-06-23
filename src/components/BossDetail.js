import React from 'react';
import { useParams } from 'react-router-dom';

function BossDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>Boss Detail</h1>
      <p>Showing details for Boss {id}</p>
      {/* Add more details such as boss picture, respawn times, videos, links */}
    </div>
  );
}

export default BossDetail;
