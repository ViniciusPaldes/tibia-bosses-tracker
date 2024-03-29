import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        width: 250,
        marginBottom: theme.spacing(2),
    },
    bossName: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        objectFit: 'none',
        minHeight: '100px',
    },
    lastCheck: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'center',
    },
    multiLocation:{
        marginTop: '-15px',
    },
    singleLocation:{
        marginTop: '4.5px',
    },
    lastCheckLabel: {
        fontWeight: 'bold',
    },
    lastCheckTimestamp: {
        marginLeft: 8,
        color: '#555555',
    },
    checkButton: {
        marginTop: theme.spacing(2),
        width: '100%',
        alignSelf: 'bottom',
    },
    imageContainer: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chanceImageContainer: {
        position: 'absolute',
        top: theme.spacing(1),
        left: theme.spacing(1),
        zIndex: 1,
    },
    lastSeen: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    bossImageContainer: {
        zIndex: 0,
    },
    chanceImage: {
        width: 50,
        height: 50,
    },
    materialButtonStyle: {
        display: 'inline-block',
        padding: '6px 16px',
        border: 'none',
        marginTop: '8px',
        width: '100%',
        borderRadius: '4px',
        backgroundColor: '#3f51b5', // Primary button color
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase',
        cursor: 'pointer',
        fontFamily: '"Montserrat",sans-serif',
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: '0.02857em',
        transition: 'background-color 250ms ease-in-out, box-shadow 250ms ease-in-out',
        userSelect: 'none',
        '&:hover': {
          backgroundColor: '#115293', // Darker shade for hover state
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        },
        '&:active': {
          backgroundColor: '#0d47a1', // Slightly darker shade for active state
        },
        '&:focus': {
          outline: 'none',
          border: '2px solid #fff', // or any other style for focus
        },
    },
    disabled: {
        backgroundColor: '#e0e0e0', // Disabled background color
        color: '#9e9e9e', // Disabled text color
        cursor: 'default',
        pointerEvents: 'none', // Prevents click events
      },
      rightContainer: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
      }
}));
