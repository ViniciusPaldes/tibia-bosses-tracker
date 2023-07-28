import React from 'react';
import { useFetchBosses } from '../services/firebase';
import KilledBossItem from './KilledBossItem';
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
  const bosses = useFetchBosses();
  const bossesWithKilledYesterday = bosses?.filter((boss) => boss.killedYesterday > 0);

  return (
    <div className={classes.container}>
      <Typography variant="h5" component="h2" className={classes.title}>
        Bosses mortos ontem
      </Typography>
      <div className={classes.navigationButtons}>
        <div className={classes.listContainer}>
          {(bossesWithKilledYesterday && bossesWithKilledYesterday.length > 0) &&
            bossesWithKilledYesterday.map((boss) => (
              <KilledBossItem key={boss.id} boss={boss} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default KilledBosses;
