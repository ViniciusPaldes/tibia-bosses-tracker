// BossDetailContext.js
import React, { createContext, useState } from 'react';

const BossDetailContext = createContext();

const BossDetailProvider = ({ children }) => {
  const [isBossDetailOpen, setIsBossDetailOpen] = useState(false);
  const [selectedBoss, setSelectedBoss] = useState(null);

  return (
    <BossDetailContext.Provider value={{ isBossDetailOpen, setIsBossDetailOpen, selectedBoss, setSelectedBoss }}>
      {children}
    </BossDetailContext.Provider>
  );
};

export { BossDetailContext, BossDetailProvider };
