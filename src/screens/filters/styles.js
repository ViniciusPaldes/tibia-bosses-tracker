import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#3f51b5',
      padding: '16px',
      minHeight: '100vh',
      width: '300px', 
      minWidth: '300px',
    },
    title: {
      color: 'white',
    },
    filterSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    label: {
      color: 'white',
      fontWeight: 'bold',
  
      marginTop: '8px',
      marginBottom: '8px',
    },
    buttonContainer: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  }));