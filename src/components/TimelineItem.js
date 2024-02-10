import { makeStyles } from "@material-ui/core";
import { Card, CardContent, Typography, ListItemAvatar } from '@material-ui/core';
import { formatTimeDifference } from "../services/date";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
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

const TimelineItem = ({ check, boss }) => {
    const classes = useStyles();
    const isKilled = check.killed === true;
    const [formattedTimeDifference, setFormattedTimeDifference] = useState(formatTimeDifference(check.timestamp));

    useEffect(() => {
        const interval = setInterval(() => {
            setFormattedTimeDifference(formatTimeDifference(check.timestamp));
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [check.timestamp]);

    return (
        <Card
            key={check.id}
            variant="outlined"
            className={`${classes.card} ${isKilled ? classes.killedCard : ""}`}
        >
            <CardContent className={classes.content}>
                <ListItemAvatar>
                    <img src={isKilled ? boss.dead_image : boss.image} alt={boss.name} className={classes.avatar} />
                </ListItemAvatar>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" className={`${classes.bossName} ${isKilled ? classes.killedText : ""}`}>
                        {boss.name.length > 13 ? `${boss.name.slice(0, 13)}...` : boss.name}
                    </Typography>
                    <div>
                    <Typography variant="body" className={`${classes.checkedAt} ${isKilled ? classes.killedText : ""}`}>
                        {isKilled ? "Morto: " : ""} {formattedTimeDifference}
                    </Typography>
                    <Typography variant="body2" className={`${classes.fullDate} ${isKilled ? classes.killedText : ""}`}>
                        {check.timestamp?.toDate().toLocaleString('pt-BR')}
                    </Typography>    
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default TimelineItem;