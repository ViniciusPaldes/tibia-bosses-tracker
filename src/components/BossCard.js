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
        width: 300,
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

const BossCard = ({ boss, handleCheck }) => {
    const classes = useStyles();

    // Function to get the chance image based on the chance color
    const getChanceImage = () => {
        switch (boss?.chance) {
            case 'High':
                return highChanceImage;
            case 'Medium':
                return mediumChanceImage;
            case 'No':
            default:
                return lowChanceImage;
        }
    };

    return (
        <Card className={classes.root} key={boss.id}>
            <CardActionArea>
                <div className={classes.imageContainer}>
                    {/* Add the chance image */}
                    <div className={classes.chanceImageContainer}>
                        <img src={getChanceImage()} className={classes.chanceImage} alt="Chance" />
                    </div>
                    <div className={classes.bossImageContainer}>
                        <img src={boss.image} alt={boss.name} className={classes.image} />
                    </div>
                </div>
                <div className={classes.cardContent}>
                    <Typography variant="h6" component="h3" gutterBottom className={classes.bossName}>
                        {boss.name.length > 25 ? `${boss.name.slice(0, 25)}...` : boss.name}
                    </Typography>
                    <div className={classes.lastCheck}>
                        <Typography variant="body2" className={classes.lastCheckLabel}>
                            Last Check:
                        </Typography>
                        <Typography variant="body2" className={classes.lastCheckTimestamp}>
                            {getMostRecentTimestamp(boss)}
                        </Typography>
                    </div>
                    <Button
                        className={classes.checkButton}
                        variant="contained"
                        color="primary"
                        onClick={() => handleCheck(boss)}
                    >
                        Check
                    </Button>
                </div>
            </CardActionArea>
        </Card>
    );
};

export default BossCard;
