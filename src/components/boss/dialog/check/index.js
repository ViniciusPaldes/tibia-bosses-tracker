import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { saveCheckToFirestore } from "services/firebase-service";

import { useStyles } from "./styles";

export const CheckDialog = ({ visible, boss, onClose, onSave }) => {
  const classes = useStyles();
  const [lootText, setLootText] = useState("");
  const [lootVisible, setLootVisible] = useState(false);

  const handleDialogClose = () => {
    onClose();
  };

  const handleLootDialogClose = () => {
    setLootText("");
    setLootVisible(false);
    handleDialogClose();
  };

  const handleConfirm = async (confirmed) => {
    if (confirmed) {
      setLootVisible(true);
    } else {
      // Handle if user did not defeat the boss
      handleDialogClose();
    }
  };

  const handleSave = async (killed) => {
    const loot = lootText?.trim();
    try {
      await saveCheckToFirestore(null, boss.id, killed, loot);
      onSave({ success: true, message: "Check salvo!" });
    } catch (error) {
      onSave({
        success: false,
        message: "Falhou ao salvar, favor reportar para Sabarath.",
      });
    } finally {
      handleLootDialogClose();
    }
  };

  return (
    <div>
      <Dialog open={visible} onClose={handleDialogClose}>
        <DialogTitle className={classes.dialogTitle}>
          Confirmar status do Boss
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="body1">
            Você matou o boss: "{boss?.name}"?
          </Typography>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            onClick={() => handleConfirm(true)}
            color="primary"
            variant="contained"
            className={classes.confirmationButton}
            style={{ backgroundColor: "#006400", color: "#fff" }} // Dark green color for "Yes" button
          >
            Sim
          </Button>
          <Button
            onClick={() => handleSave(false)}
            color="primary"
            variant="contained"
            className={classes.confirmationButton}
            style={{ backgroundColor: "#dc143c", color: "#fff" }} // Dark red color for "No" button
          >
            Não
          </Button>
        </DialogActions>
        <DialogActions
          className={classes.dialogActions}
          style={{ marginTop: "-2rem" }}
        >
          <Button
            onClick={handleDialogClose}
            color="primary"
            variant="text"
            className={classes.confirmationButton}
            style={{ color: "#000" }} // Black color for "Cancel" button
          >
            Cancelar check
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={lootVisible} onClose={handleLootDialogClose}>
        <DialogTitle className={classes.dialogTitle}>
          Informe o loot
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="body1">
            Copie o loot do cliente do tibia:
          </Typography>
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
            onClick={() => handleSave(true)}
            color="primary"
            variant="contained"
          >
            Salvar
          </Button>
          <Button onClick={handleLootDialogClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
