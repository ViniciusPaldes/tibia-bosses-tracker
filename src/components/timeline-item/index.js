import { Card, CardContent, Typography, ListItemAvatar } from '@material-ui/core';
import { useEffect, useState } from "react";
import { formatHours, formatTimeDifference } from "utils/date";

import { useStyles } from "./style";

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
            variant="outlined"
            className={`${classes.card} ${isKilled ? classes.killedCard : ""}`}
        >
            <CardContent className={classes.content}>
                <ListItemAvatar>
                    <img src={isKilled ? boss.dead_image : boss.image} alt={boss.name} className={classes.avatar} />
                </ListItemAvatar>
                <div className={classes.info}>
                    <Typography variant="h6" className={`${classes.bossName} ${isKilled ? classes.killedText : ""}`}>
                        {boss.name}
                    </Typography>
                    <div>
                    <Typography variant="body1" className={`${classes.checkedAt} ${isKilled ? classes.killedText : ""}`}>
                        {isKilled ? "Morto: " : ""} {formattedTimeDifference}
                    </Typography>
                    <Typography variant="body2" className={`${classes.fullDate} ${isKilled ? classes.killedText : ""}`}>
                        {formatHours(check.timestamp?.toDate())}
                    </Typography>    
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default TimelineItem;