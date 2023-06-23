import React, { useState, useEffect } from 'react';
import BossCard from '../BossCard';
import { saveBossData } from '../../services/firebase';

function BossesList() {
  const [bossData, setBossData] = useState([]);
  const [creatures, setCreatures] = useState([]);
  const [boostableBosses, setBoostableBosses] = useState([]);

  useEffect(() => {
    fetch('https://api.tibiadata.com/v3/killstatistics/Venebra')
      .then((response) => response.json())
      .then((data) => {
        const { killstatistics } = data;

        if (killstatistics) {
          const { entries } = killstatistics;
          setBossData(entries);
        }
      });

    fetch('https://api.tibiadata.com/v3/creatures')
      .then((response) => response.json())
      .then((data) => {
        const { creatures } = data;

        if (creatures) {
          const { creature_list } = creatures;
          setCreatures(creature_list);
        }
      });

    fetch('https://api.tibiadata.com/v3/boostablebosses')
      .then((response) => response.json())
      .then((data) => {
        const { boostable_boss_list } = data.boostable_bosses;

        if (boostable_boss_list) {
          setBoostableBosses(boostable_boss_list);
        }
      });
  }, []);

  // Filter out creatures and boostable bosses from bossData
  const filteredBosses = bossData.filter((boss) => {
    const bossName = boss.race.trim().toLowerCase();
    const isCreature = creatures.some((creature) => creature.name.trim().toLowerCase() === bossName);
    const isBoostableBoss = boostableBosses.some((boostableBoss) => boostableBoss.name.trim().toLowerCase() === bossName);
    return !isCreature && !isBoostableBoss;
  });

  console.log("filteredBosses", filteredBosses)

  return (
    <div>
      <button onClick={() => saveBossData(filteredBosses)}>Save Boss Data</button>

      <h1>Most Probable Bosses</h1>
      <div className="horizontal-list">
        {filteredBosses.slice(0, 4).map((boss) => (
          <BossCard key={boss.race} boss={boss} />
        ))}
      </div>

      <h2>All Bosses</h2>
      <div className="vertical-list">
        {filteredBosses.map((boss) => (
          <BossCard key={boss.race} boss={boss} />
        ))}
      </div>
    </div>
  );
}

export default BossesList;
