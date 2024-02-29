import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    main: {
      flex: 1,
    },
    loader: {
      display: 'flex',
      justifyContent: 'center',
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
      justifyItems: 'center'
    },
    tableContainer: {
      marginBottom: theme.spacing(4),
      borderTopWidth: '2px',
      borderTopStyle: 'solid',
      borderTopColor: '#dedede',
      paddingTop: theme.spacing(3),
    },
    tableTitle: {
      textAlign: 'center',
      fontWeight: 'bold',
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
    whiteBackground: {
      backgroundColor: 'white',
    },
  
    greyBackground: {
      backgroundColor: '#f6f6f6',
    },
  
    accordionSummaryRoot: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }));