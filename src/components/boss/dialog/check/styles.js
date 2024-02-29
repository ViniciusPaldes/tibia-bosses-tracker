import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
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
  }));