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
    bossImageContainer: {
        zIndex: 0,
    },
    chanceImage: {
        width: 50,
        height: 50,
    },
}));
