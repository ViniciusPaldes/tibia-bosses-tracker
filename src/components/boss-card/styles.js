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
        position: 'relative', // Add position relative to the image container
        justifyContent: 'center',
        alignItems: 'center',
    },
    chanceImageContainer: {
        position: 'absolute', // Position the chance image container
        top: theme.spacing(1), // Adjust the top spacing as needed
        left: theme.spacing(1), // Adjust the left spacing as needed
        zIndex: 1, // Ensure the chance image appears above the boss image
    },
    bossImageContainer: {
        zIndex: 0, // Ensure the boss image appears below the chance image
    },
    chanceImage: {
        width: 50, // Adjust the width of the chance image as needed
        height: 50, // Adjust the height of the chance image as needed
    },
}));
