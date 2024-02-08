import React from 'react';
import { useFetchBosses } from '../services/firebase-service';
import KilledBossItem from './KilledBossItem';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  container: {
    flex:1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#a0a0a0',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
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
  accordion: {
    width: '100%',
  },
}));

const KilledBosses = () => {
  const classes = useStyles();
  const bosses = useFetchBosses();
  const bossesWithKilledYesterdayAndUniqueNames = bosses?.filter((boss) => boss.killedYesterday > 0)
    .reduce((uniqueBosses, boss) => {
      if (!uniqueBosses[boss.name]) {
        uniqueBosses[boss.name] = boss;
      }
      return uniqueBosses;
    }, {});

  const uniqueBossesArray = Object.values(bossesWithKilledYesterdayAndUniqueNames);
  return (
    <div className={classes.container}>
      <Accordion className={classes.accordion} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="killed-bosses-content"
          id="killed-bosses-header"
        >
          <Typography variant="h5" className={classes.title}>
            Bosses mortos ontem
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.content}>
          <div className={classes.listContainer}>
            {uniqueBossesArray.map((boss) => (

              <KilledBossItem key={boss.id} boss={boss} />

            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default KilledBosses;
