import React from 'react';
import KilledBosses from '../components/KilledBosses';
import BossList from '../components/BossList';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
    color: '#3f51b5',
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: theme.spacing(3),
    fontWeight: 'bold',
    color: '#555555',
    textAlign: 'center',
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <KilledBosses />
      <Typography variant="h5" component="h2" className={classes.title}>
        Previsões de Venebra para
      </Typography>
      <Typography variant="subtitle1" className={classes.subtitle}>
        {new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
      </Typography>

      <BossList />
    </div>
  );
};

export default Home;
