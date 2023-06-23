import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BossList from './components/BossList';
import BossDetail from './components/BossDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BossList />} />
        <Route path="/boss/:id" element={<BossDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
