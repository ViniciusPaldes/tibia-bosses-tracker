import React from 'react';
import TimelineItem from 'components/timeline-item';
import { useStyles } from './styles';

const Timeline = ({visible, bosses}) => {
  const classes = useStyles();

  // Create a new array that contains all the checks for all bosses
  const allChecks = bosses.reduce((checks, boss) => {
    return checks.concat(boss.checks);
  }, []);

  // Sort the checks by the latest timestamp
  const sortedChecks = allChecks.sort((a, b) => b.timestamp - a.timestamp).slice(0, 50);
  
  if (!visible) return
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>Últimos bosses checados</h2>
      {sortedChecks.map((check) => {
        const boss = bosses.find((b) => b.id === check.bossId);
        if (!boss) return null;

        return (
          <TimelineItem key={check.id} boss={boss} check={check}/>
        );
      })}
    </div>
  );
};

export default Timeline;