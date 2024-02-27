import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
    getChanceImage,
    getBossImage
} from 'assets/images';
import { getBossTime, getMostRecentKilledTimestamp, isFullMoonActive } from 'services/date';
import { useStyles } from './styles';
import { isKilled } from 'services/bosses';

const BossCard = ({ boss, handleCheck, key }) => {
    const classes = useStyles();

    const getButtonTextCTA = () => {
        return isKilled(boss) && !boss.shorterRespawn ? "Morto" : boss.checkable ? "Checar" : "Invasão será anunciada"
    }

    const isDisabledToCheck = () => {
        if (!isFullMoonActive(boss) && boss.shorterRespawn) {
            return true
        } else {
            return (!boss.checkable || isKilled(boss)) && !boss.shorterRespawn
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
            if (boss.wip) {
                return "Pendente de integração"
            } else {
                return boss.checkable && boss.chanceLabel !== "Sem chance" ? 'Check' : 'Novamente em'
            }
        }
    }

    return (
        <Card className={classes.root} key={key}>
            <CardActionArea>
                <div className={classes.imageContainer}>
                    {/* Add the chance image */}
                    <div className={classes.chanceImageContainer}>
                        <img src={getChanceImage(boss)} className={classes.chanceImage} alt="Chance" />
                    </div>
                    <div className={classes.bossImageContainer}>
                        <img src={getBossImage(boss)} alt={boss.name} className={classes.image} />
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
                            {getBossTime(boss)}
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
