import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: '16px',
        width: '100%',
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
    },
    bossName: {
        whiteSpace: 'nowrap',
        overflow: 'hidden', 
        textOverflow: 'ellipsis',
        width: '100%', 
        marginRight: '10px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333333',
    },
    checkedAt: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#555555',
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
    info: {
        display: 'flex', 
        flexDirection: 'column',
        width: '180px',
        maxWidth: '100%',
    }
}));
