import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    margin: '0 auto',
    marginTop: 20,
  },
  bossImage: {
    width: '100%',
  },
  bossName: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  playersKilled: {
    marginTop: 10,
  },
});

const BossCard = ({ boss }) => {
  const classes = useStyles();

  const { race, last_day_killed } = boss;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" component="h2" className={classes.bossName}>
          {race}
        </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.playersKilled}>
          Last Day Killed: { last_day_killed }
        </Typography>
        <Button component={Link} to={`/bosses/${race}`} variant="contained" color="primary">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default BossCard;
