import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useFetchBosses } from '../../services/boss';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    marginBottom: theme.spacing(2),
  },
  media: {
    height: 100,
    maxWidth: 100,
    objectFit: 'cover',
    display: 'flex',
    justifyContent: 'center',
  },
  checkButton: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing(2),
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}));

function BossesList() {
  const classes = useStyles();
  const [expandedBoss, setExpandedBoss] = useState(null);
  const bosses = useFetchBosses();

  const handleExpandClick = (boss) => {
    setExpandedBoss(boss === expandedBoss ? null : boss);
  };

  const handleCheck = (boss) => {
    // Handle check button click here
    console.log('Checking boss:', boss.name);
  };

  return (
    <div>
      <h1>Bosses</h1>
      <div className={classes.gridContainer}>
        {bosses.map((boss) => (
          <Card className={classes.root} key={boss.name}>
            <div style={{ position: 'relative' }}>
              <CardActionArea>
                <CardMedia className={classes.media} image={boss.image} title={boss.name} />
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {boss.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {boss.type}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </div>
            <Button
              className={classes.checkButton}
              variant="contained"
              color="primary"
              onClick={() => handleCheck(boss)}
            >
              Check
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default BossesList;
