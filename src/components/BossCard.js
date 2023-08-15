import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Import the chance images

import highChanceImage from '../assets/high_chance.png';
import mediumChanceImage from '../assets/medium_chance.png';
import lowChanceImage from '../assets/low_chance.png';
import noChanceImage from '../assets/no_chance.png';

import { getMostRecentKilledTimestamp, getMostRecentTimestampFormat, isFullMoonActive, isToday } from '../services/date';

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

const BossCard = ({ boss, handleCheck, key }) => {
    const classes = useStyles();



    // Function to get the chance image based on the chance color
    const getChanceImage = () => {
        if (isFullMoonActive(boss)) {
            return highChanceImage
        } else {
            const chanceLabel = boss?.chanceLabel;
            switch (chanceLabel) {
                case "Alta":
                    return highChanceImage;
                case "Média":
                    return mediumChanceImage;
                case "Baixa": 
                    return lowChanceImage;
                default:
                    return noChanceImage;
            }
        }
     
    };

    const getBossImage = () => {
        if (boss.chance === 0) {
            return boss.dead_image;
        } else {
            return boss.image;
        }
    }

    const isKilled = () => {
        // Check if "checks" property exists and it is an array
        if (boss && boss.checks && Array.isArray(boss.checks)) {
            // Check if any of the checks match the current date and have "killed" set to true
            return boss.checks.some((check) => {
                if (check.killed) {
                    // Convert the timestamp to a Date object
                    const checkDate = new Date(check.timestamp?.seconds * 1000 + check.timestamp?.nanoseconds / 1000000);

                    // Check if the check date matches the current date (ignoring the time)
                    return isToday(checkDate);
                }
                return false;
            });
        }

        // Return false if checks are not defined or not an array
        return false;
    };

    const getButtonTextCTA = () => {
        return isKilled() && !boss.shorterRespawn ? "Morto" : boss.checkable ? "Checar" : "Invasão será anunciada"
    }

    const isDisabledToCheck = () => {
        if (!isFullMoonActive(boss) && boss.shorterRespawn) {
            return true
        } else {
            return (!boss.checkable || isKilled()) && !boss.shorterRespawn
        }
    }

    const getBossTime = () => {
        if (boss.shorterRespawn) {
            if (isFullMoonActive(boss)) {
                if (getMostRecentKilledTimestamp(boss) !== '-') {
                    const minutes = Math.floor((new Date() - getMostRecentKilledTimestamp(boss)?.toDate()) / (1000 * 60));
                    const remainingTime = boss.respawnTime - minutes
                    if (remainingTime <= 0) {
                        if (remainingTime < -10) {
                            return `Possível aparição a ${Math.abs(remainingTime)} minutos`
                        } else {
                            return "a qualquer momento"
                        }
                        
                    } else {
                        return `${remainingTime} minutos`
                    }
                } else {
                    return "-"
                }
            } else {
                return "Todo mês dos dias 12 ao 15 (SS)"
            }
           
            
        } else {
            return boss.checkable && boss.chanceLabel !== "Sem chance" ? getMostRecentTimestampFormat(boss) : `${boss.expectedIn} dias`
        }
    }

    const getBossCheckLabel = () => {
        if (boss.shorterRespawn) {
            if (isFullMoonActive(boss)) {
                if (getMostRecentKilledTimestamp(boss) !== '-') {
                    const minutes = Math.floor((new Date() - getMostRecentKilledTimestamp(boss)?.toDate()) / (1000 * 60));
                    const remainingTime = boss.respawnTime - minutes
                    if (remainingTime < -10) {
                        return "Mate-o para recalibrar"
                    } else {
                        return "Novamente em"
                    }
                } else {
                    return "Mate-o para recalibrar"
                }
            } else {
                return "Aguarde a próxima lua cheia"
            }
            
        } else {
            return boss.checkable && boss.chanceLabel !== "Sem chance" ? 'Check' : 'Novamente em'
        }
    }

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
                            {getBossCheckLabel()}
                        </Typography>
                        <Typography variant="body2" className={classes.lastCheckTimestamp}>
                            {getBossTime()}
                        </Typography>
                    </div>
                    <Button
                        className={classes.checkButton}
                        variant="contained"
                        color="primary"
                        disabled={isDisabledToCheck()}
                        onClick={() => handleCheck(boss)}
                    >
                        {getButtonTextCTA()}
                    </Button>
                </div>
            </CardActionArea>
        </Card>
    );
};

export default BossCard;
