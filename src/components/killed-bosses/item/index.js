import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { useStyles } from './styles';

const KilledBossItem = ({ boss }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} key={boss.id}>
      <CardActionArea>
        <div className={classes.imageContainer}>
          <div className={classes.bossImageContainer}>
            <img src={boss.dead_image} alt={boss.name} className={classes.image} />
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
