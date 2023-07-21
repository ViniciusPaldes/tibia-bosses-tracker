import React, { useEffect, useState } from 'react';
import { fetchBossesLastDayKilled } from '../services/firebase';
import KilledBossItem from './KilledBossItem';
import Button from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
    color: '#3f51b5',
  },
  listContainer: {
    display: 'flex',
    overflowX: 'auto',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  navigationButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    width: '100%',
  },
  backButton: {
    height: '40px',
    alignSelf: 'center',
    marginRight: theme.spacing(2),
  },
  forwardButton: {
    height: '40px',
    alignSelf: 'center',
    marginLeft: theme.spacing(2),
  },
}));

const KilledBosses = () => {
  const classes = useStyles();
  const [bosses, setBosses] = useState([]);

  useEffect(() => {
    const fetchKilledBosses = async () => {
      const fetchedBosses = await fetchBossesLastDayKilled();
      const filteredBosses = fetchedBosses.filter((boss) => boss.lastDayKilled >= 1);
      setBosses(filteredBosses);
    };
    fetchKilledBosses();
  }, []);

  

  return (
    <div className={classes.container}>
      <Typography variant="h5" component="h2" className={classes.title}>
        Bosses mortos ontem
      </Typography>
      <div className={classes.navigationButtons}>
        <div className={classes.listContainer}>
          {(bosses && bosses.length > 0) &&
            bosses.map((boss) => (
              <KilledBossItem key={boss.id} boss={boss.boss} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default KilledBosses;
