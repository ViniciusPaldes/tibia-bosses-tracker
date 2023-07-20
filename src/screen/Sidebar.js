import React from 'react';
import { useFetchBosses } from '../services/firebase';
import { makeStyles } from '@material-ui/core/styles';
import SidebarItem from '../components/SidebarItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    padding: '16px',
  },
  title: { 
    color: "white",
  },
}));

const Sidebar = ({visible}) => {
  const classes = useStyles();
  const bosses = useFetchBosses();

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
          <SidebarItem key={check.id} boss={boss} check={check}/>
        );
      })}
    </div>
  );
};

export default Sidebar;
