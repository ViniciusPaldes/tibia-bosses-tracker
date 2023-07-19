import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Import the chance images

import highChanceImage from '../assets/high_chance.png';
import mediumChanceImage from '../assets/medium_chance.png';
import lowChanceImage from '../assets/no_chance.png';
import { getMostRecentTimestamp } from '../services/date';

const useStyles = makeStyles((theme) => ({
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

const BossCard = ({ boss, handleCheck, key }) => {
    const classes = useStyles();

    // Function to get the chance image based on the chance color
    const getChanceImage = () => {
        const chance = boss?.chance;

        if (chance > 0.05) {
            return highChanceImage;
        } else if (chance > 0) {
            return mediumChanceImage;
        } else {
            return lowChanceImage;
        }
    };

    const getBossImage = () => {
        if (boss.chance === 0) {
            return boss.dead_image;
        } else {
            return boss.image;
        }
    }

    const isKilledToday = () => {
        // Check if "checks" property exists and it is an array
        if (boss && boss.checks && Array.isArray(boss.checks)) {
            // Get the current date
            const currentDate = new Date();

            
            // Check if any of the checks match the current date and have "killed" set to true
            return boss.checks.some((check) => {
                if (check.killed) {
                    // Convert the timestamp to a Date object
                    const checkDate = new Date(check.timestamp.seconds * 1000 + check.timestamp.nanoseconds / 1000000);

                    // Check if the check date matches the current date (ignoring the time)
                    return checkDate.toDateString() === currentDate.toDateString();
                }
                return false;
            });
        }

        // Return false if checks are not defined or not an array
        return false;
    };


    return (
        <Card className={classes.root} key={key}>
            <CardActionArea>
                <div className={classes.imageContainer}>
                    {/* Add the chance image */}
                    <div className={classes.chanceImageContainer}>
                        <img src={getChanceImage()} className={classes.chanceImage} alt="Chance" />
                    </div>
                    <div className={classes.bossImageContainer}>
                        <img src={getBossImage()} alt={boss.name} className={classes.image} />
                    </div>
                </div>
                <div className={classes.cardContent}>
                    <Typography variant="h6" component="h3" gutterBottom className={classes.bossName}>
                        {boss.name.length > 25 ? `${boss.name.slice(0, 25)}...` : boss.name}
                    </Typography>
                    <div className={classes.lastCheck}>
                        <Typography variant="body2" className={classes.lastCheckLabel}>
                            Último Check:
                        </Typography>
                        <Typography variant="body2" className={classes.lastCheckTimestamp}>
                            {getMostRecentTimestamp(boss)}
                        </Typography>
                    </div>
                    <Button
                        className={classes.checkButton}
                        variant="contained"
                        color="primary"
                        disabled={!boss.checkable || isKilledToday()}
                        onClick={() => handleCheck(boss)}
                    >
                        {isKilledToday() ? "Morto hoje" : boss.checkable ? "Checar" : "Invasão será anunciada"}
                    </Button>
                </div>
            </CardActionArea>
        </Card>
    );
};

export default BossCard;
