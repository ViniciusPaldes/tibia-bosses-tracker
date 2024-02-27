import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
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
      position: 'absolute', 
      top: theme.spacing(1),
      left: theme.spacing(1),
      zIndex: 1,
    },
    bossImageContainer: {
      zIndex: 0,
    },
  }));
  