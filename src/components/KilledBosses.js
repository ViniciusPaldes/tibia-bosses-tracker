import React, { useEffect, useState } from 'react';
import { fetchBossesLastDayKilled } from '../services/firebase';
import BossCard from './BossCard';
import KilledBossItem from './KilledBossItem';
import Button from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  listContainer: {
    display: 'flex',
    overflowX: 'auto',
    margin: theme.spacing(2),
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
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
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchKilledBosses = async () => {
      const fetchedBosses = await fetchBossesLastDayKilled();
      const filteredBosses = fetchedBosses.filter((boss) => boss.lastDayKilled >= 1);
      setBosses(filteredBosses);
    };
    fetchKilledBosses();
  }, []);

  const handleNext = () => {
    if (startIndex + 5 < (bosses && bosses.length)) {
      setStartIndex(startIndex + 5);
    }
  };

  const handlePrev = () => {
    if (startIndex - 5 >= 0) {
      setStartIndex(startIndex - 5);
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Bosses mortos ontem</h2>
      <div className={classes.navigationButtons}>
        {startIndex > 0 && (
          <Button
            className={classes.backButton}
            variant="contained"
            color="primary"
            onClick={handlePrev}
            startIcon={<NavigateBeforeIcon />}
          />
        )}
        <div className={classes.listContainer}>
          {(bosses && bosses.length > 0) &&
            bosses.slice(startIndex, startIndex + 5).map((boss) => (
              <KilledBossItem key={boss.id} boss={boss.boss} />
            ))}
        </div>
        {startIndex + 5 < (bosses && bosses.length) && (
          <Button
            className={classes.forwardButton}
            variant="contained"
            color="primary"
            onClick={handleNext}
            endIcon={<NavigateNextIcon />}
          />
        )}
      </div>
    </div>
  );
};

export default KilledBosses;
