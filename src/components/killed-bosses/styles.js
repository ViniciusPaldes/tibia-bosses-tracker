import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    container: {
      flex:1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      color: '#a0a0a0',
    },
    content: {
      display: 'flex',
      justifyContent: 'center',
    },
    listContainer: {
      display: 'flex',
      overflowX: 'auto',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    navigationButtons: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    backButton: {
      height: '40px',
      alignSelf: 'center',
      marginRight: theme.spacing(2),
    },
    forwardButton: {
      height: '40px',
      alignSelf: 'center',
      marginLeft: theme.spacing(2),
    },
    accordion: {
      width: '100%',
    },
  }));
  