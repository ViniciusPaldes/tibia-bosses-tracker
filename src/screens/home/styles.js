import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    title: {
      marginTop: theme.spacing(3),
      fontWeight: 'bold',
      color: '#3f51b5',
      textAlign: 'center',
    },
    subtitle: {
      marginBottom: theme.spacing(3),
      fontWeight: 'bold',
      color: '#555555',
      textAlign: 'center',
    },
    chip: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
      marginTop: theme.spacing(0.5),
      backgroundColor: theme.palette.tertiaryChip.main,
      opacity: 1,
      marginBottom: theme.spacing(2),
      color: 'white',
      fontWeight: 'bold',
    },
  }));
  