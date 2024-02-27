import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: '16px',
        width: '250px',
        backgroundColor: '#f8f8f8',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    content: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        width: '40px',
        height: '40px',
        marginRight: '16px',
    },
    bossName: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: '4px',
    },
    checkedAt: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#555555',
        marginBottom: '8px',
    },
    fullDate: {
        fontSize: '12px',
        color: '#888888',
    },
    killedCard: {
        backgroundColor: '#ff2730',
    },
    killedText: {
        color: 'white',
    },
}));
