import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useFetchBosses } from '../services/boss';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles((theme) => ({
  main: {
    flex:1,
  },
  root: {
    width: 300,
    marginBottom: theme.spacing(2),
  },
  bossName: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  media: {
    height: 100,
    objectFit: 'contain',
    display: 'flex',
    justifyContent: 'center',
  },
  checkButton: {
    marginTop: theme.spacing(2),
    width: '100%',
    alignSelf: 'bottom'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing(2),
    justifyItems: 'center'
  },
  tableContainer: {
    marginBottom: theme.spacing(4),
  },
  tableTitle: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    fontWeight: 'bold'
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    objectFit: 'none',
    minHeight: '100px',
  },
}));

function BossesList() {
  const classes = useStyles();
  const [expandedBoss, setExpandedBoss] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBoss, setSelectedBoss] = useState(null);
  const bosses = useFetchBosses();

  const handleCheck = (boss) => {
    setSelectedBoss(boss);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedBoss(null);
  };

  const handleConfirm = (confirmed) => {
    if (confirmed) {
      console.log('Boss killed:', selectedBoss.name);
    } else {
      console.log('Boss not found:', selectedBoss.name);
    }
    handleDialogClose();
  };

  // Organize bosses by type
  const bossesByType = bosses.reduce((acc, boss) => {
    const bossType = boss.type;
    if (acc[bossType]) {
      acc[bossType].push(boss);
    } else {
      acc[bossType] = [boss];
    }
    return acc;
  }, {});

  return (
    <div className={classes.main}>
      {Object.entries(bossesByType).map(([bossType, bossList]) => (
        <div className={classes.tableContainer} key={bossType}>
          <Typography variant="h5" component="h2" color="primary" className={classes.tableTitle}>
            {bossType}
          </Typography>
          <div className={classes.gridContainer}>
            {bossList.map((boss) => (
              <Card className={classes.root} key={boss.name}>
                <CardActionArea>
                  <div className={classes.imageContainer}>
                    <img src={boss.image} alt={boss.name} className={classes.image} />
                  </div>
                  <div className={classes.cardContent}>
                    <Typography variant="h6" component="h3" gutterBottom className={classes.bossName}>
                      {boss.name.length > 25 ? `${boss.name.slice(0, 25)}...` : boss.name}
                    </Typography>
                    <Button
                      className={classes.checkButton}
                      variant="contained"
                      color="primary"
                      onClick={() => handleCheck(boss)}
                    >
                      Check
                    </Button>
                  </div>
                </CardActionArea>
              </Card>
            ))}
          </div>
        </div>
      ))}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Boss Status</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Did you defeat the boss "{selectedBoss?.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirm(true)} color="primary">
            Yes
          </Button>
          <Button onClick={() => handleConfirm(false)} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BossesList;
