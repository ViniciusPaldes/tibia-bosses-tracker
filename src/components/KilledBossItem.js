import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '170px',
    margin: theme.spacing(2),
  },
  bossName: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    objectFit: 'none',
    minHeight: '100px',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chanceImage: {
    width: 40,
    height: 40,
  },
  chanceImageContainer: {
    position: 'absolute', // Position the chance image container
    top: theme.spacing(1), // Adjust the top spacing as needed
    left: theme.spacing(1), // Adjust the left spacing as needed
    zIndex: 1, // Ensure the chance image appears above the boss image
  },
  bossImageContainer: {
    zIndex: 0, // Ensure the boss image appears below the chance image
  },
}));

const KilledBossItem = ({ boss }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} key={boss.id}>
      <CardActionArea>
        <div className={classes.imageContainer}>
          <div className={classes.bossImageContainer}>
            <img src={boss.image} alt={boss.name} className={classes.image} />
          </div>
        </div>
        <div className={classes.cardContent}>
          <Typography variant="subtitle1" component="h3" gutterBottom className={classes.bossName}>
            {boss.name.length > 25 ? `${boss.name.slice(0, 25)}...` : boss.name}
          </Typography>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default KilledBossItem;
