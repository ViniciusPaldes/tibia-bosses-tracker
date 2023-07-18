import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { saveCheckToFirestore, useFetchBosses, saveKillStatisticsToFirestore, fetchBossesLastDayKilled } from '../services/firebase';
import { Snackbar, TextareaAutosize } from '@material-ui/core';
import { Alert } from '@mui/material';
import BossCard from './BossCard';

const useStyles = makeStyles((theme) => ({
  main: {
    flex: 1,
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing(1),
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

  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  dialogContent: {
    width: '400px',
  },
  dialogActions: {
    justifyContent: 'center',
  },
  confirmationButton: {
    margin: theme.spacing(2),
  },
  lootTextarea: {
    width: '100%',
    resize: 'vertical',
    minHeight: '100px',
    marginBottom: theme.spacing(2),
  },
  lastCheck: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  lastCheckLabel: {
    fontWeight: 'bold',
  },
  lastCheckTimestamp: {
    marginLeft: 8,
    color: '#555555',
  },
  chanceHigh: {
    color: 'green',
  },
  chanceMedium: {
    color: 'yellow',
  },
  chanceLow: {
    color: 'red',
  },
}));

function UserFeedback(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

function BossesList() {
  const classes = useStyles();
  const bosses = useFetchBosses();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [lootDialogOpen, setLootDialogOpen] = useState(false);
  const [selectedBoss, setSelectedBoss] = useState(null);
  const [lootText, setLootText] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleCheck = (boss) => {
    setSelectedBoss(boss);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = async () => {
    setConfirmDialogOpen(false);
    setSelectedBoss(null);
  };

  const handleLootDialogClose = () => {
    handleConfirmDialogClose();
    setLootDialogOpen(false);
    setSelectedBoss(null);
    setLootText('');
  };

  const handleConfirm = async (confirmed) => {
    if (confirmed) {
      setLootDialogOpen(true);
    } else {
      // Handle if user did not defeat the boss
      handleConfirmDialogClose();
    }
  };

  const handleSave = async (killed) => {
    const loot = lootText?.trim(); // Remove leading/trailing whitespace
    try {
      await saveCheckToFirestore(null, selectedBoss.id, killed, loot);
      setConfirmationMessage('Saved successfully!');
    } catch (error) {
      setConfirmationMessage('Failed to save. Please try again.');
    } finally {
      handleConfirmDialogClose();
    }
    setConfirmationOpen(true);
    handleLootDialogClose();
  };

  const handleConfirmationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setConfirmationOpen(false);
  };

  // Organize bosses by type and order by chance
  const bossesByType = bosses.reduce((acc, boss) => {
    const bossType = boss.type;
    if (acc[bossType]) {
      acc[bossType].push(boss);
    } else {
      acc[bossType] = [boss];
    }
    // Sort bosses within the same type by chance (descending order)
    acc[bossType].sort((a, b) => {
      return b.chance - a.chance;
    });
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
              <BossCard
                boss={boss}
                handleCheck={handleCheck}
              />
            ))}
          </div>
        </div>
      ))}
      <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
        <DialogTitle className={classes.dialogTitle}>
          Confirmar status do Boss
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="body1">
            Você matou o boss: "{selectedBoss?.name}"?
          </Typography>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            onClick={() => handleConfirm(true)}
            color="primary"
            variant="contained"
            className={classes.confirmationButton}
            style={{ backgroundColor: '#006400', color: '#fff' }} // Dark green color for "Yes" button
          >
            Sim
          </Button>
          <Button
            onClick={() => handleSave(false)}
            color="primary"
            variant="contained"
            className={classes.confirmationButton}
            style={{ backgroundColor: '#dc143c', color: '#fff' }} // Dark red color for "No" button
          >
            Não
          </Button>
        </DialogActions>
        <DialogActions className={classes.dialogActions} style={{ marginTop: '-2rem' }}>
          <Button
            onClick={handleConfirmDialogClose}
            color="primary"
            variant="text"
            className={classes.confirmationButton}
            style={{ color: '#000' }} // Black color for "Cancel" button
          >
            Cancelar check
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={lootDialogOpen}
        onClose={handleLootDialogClose}
      >
        <DialogTitle className={classes.dialogTitle}>Informe o loot</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="body1" >Copie o loot do cliente do tibia:</Typography>
          <TextareaAutosize
            minRows={3}
            className={classes.lootTextarea}
            placeholder="Exemplo: 16:55:26 Loot of Zomba: 3 gold coins."
            value={lootText}
            onChange={(e) => setLootText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleSave(true)} color="primary"
            variant="contained"
          >
            Salvar
          </Button>
          <Button onClick={handleLootDialogClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={confirmationOpen} autoHideDuration={3000} onClose={handleConfirmationClose}>
        <UserFeedback onClose={handleConfirmationClose} severity={confirmationMessage.includes('Failed') ? 'error' : 'success'}>
          {confirmationMessage}
        </UserFeedback>
      </Snackbar>
    </div>
  );
}

export default BossesList;
