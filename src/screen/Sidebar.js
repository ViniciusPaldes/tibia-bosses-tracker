import React from 'react';
import { useFetchBosses } from '../services/firebase';
import { Card, CardContent, Typography, ListItemAvatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  card: {
    marginBottom: '16px',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '40px',
    height: '40px',
    marginRight: '16px',
  },
  bossName: {
    marginBottom: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  checkedAt: {
    fontSize: '12px',
    color: '#888888',
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
          <Card key={check.id} variant="outlined" className={classes.card}>
            <CardContent className={classes.content}>
              <ListItemAvatar>
                <img src={boss.image} alt={boss.name} className={classes.avatar} />
              </ListItemAvatar>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" className={classes.bossName}>
                  {boss.name.length > 15 ? `${boss.name.slice(0, 15)}...` : boss.name}
                </Typography>
                <Typography variant="body2" className={classes.checkedAt}>
                  Checado: {check.timestamp?.toDate().toLocaleString('pt-BR')}
                </Typography>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Sidebar;
