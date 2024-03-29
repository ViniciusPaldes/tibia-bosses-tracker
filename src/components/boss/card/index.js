import { Tooltip } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import LastSeenIcon from "@material-ui/icons/RemoveRedEyeSharp";
import { getBossImage } from "assets/images";
import ChanceIcon from "components/chance-icon";
import { ListOptionsContext } from "context/list-options";
import React, { useContext } from "react";
import { createFavorite, deleteFavorite } from "services/firebase-service";
import { isKilled } from "utils/bosses";
import {
  formatTimeDifference,
  getBossTime,
  getDaysSinceLastSeen,
  getMostRecentKilledTimestamp,
  getMostRecentTimestamp,
  isFullMoonActive,
} from "utils/date";

import Favorite from "../favorite";

import { useStyles } from "./styles";

const BossCard = ({ boss, userId, handleCheck }) => {
  const classes = useStyles();
  const { listMode } = useContext(ListOptionsContext);
  const listModeSelected = listMode.filter((item) => item.selected)[0]?.name;

  const daysLastSeen = getDaysSinceLastSeen(boss.lastSeen);

  const getButtonTextCTA = () => {
    return isKilled(boss) && !boss.shorterRespawn
      ? "Morto"
      : boss.checkable
      ? "Checar"
      : "Invasão será anunciada";
  };

  const isDisabledToCheck = () => {
    if (!isFullMoonActive(boss) && boss.shorterRespawn) {
      return true;
    } else {
      return (!boss.checkable || isKilled(boss)) && !boss.shorterRespawn;
    }
  };

  const getBossCheckLabel = () => {
    if (boss.shorterRespawn) {
      if (isFullMoonActive(boss)) {
        if (getMostRecentKilledTimestamp(boss) !== "-") {
          const minutes = Math.floor(
            (new Date() - getMostRecentKilledTimestamp(boss)?.toDate()) /
              (1000 * 60)
          );
          const remainingTime = boss.respawnTime - minutes;
          if (remainingTime < -10) {
            return "Mate-o para recalibrar";
          } else {
            return "Novamente em";
          }
        } else {
          return "Mate-o para recalibrar";
        }
      } else {
        return "Aguarde a próxima lua cheia";
      }
    } else {
      if (boss.wip) {
        return "Boss sem previsão, check";
      } else {
        return boss.checkable && boss.chanceLabel !== "Sem chance"
          ? "Check"
          : "Novamente em";
      }
    }
  };

  const timeSinceLastCheck = () => {
    const timestamp = getMostRecentTimestamp(boss);
    if (timestamp !== "-" && !boss.multipleInDay) {
      return `(${formatTimeDifference(timestamp)})`;
    }
    return "";
  };

  const toggleFavorite = () => {
    if (boss.favorite) {
      deleteFavorite(userId, boss.id);
    } else {
      createFavorite(userId, boss.id);
    }
  };

  const bossName = () => {
    return (
      <Typography
        variant="h6"
        component="h3"
        gutterBottom
        className={classes.bossName}
      >
        {boss.name.length > 20 ? `${boss.name.slice(0, 20)}...` : boss.name}
      </Typography>
    );
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <div className={classes.imageContainer}>
          <div className={classes.chanceImageContainer}>
            <ChanceIcon boss={boss} />
          </div>

          <div className={classes.bossImageContainer}>
            <img
              src={getBossImage(boss)}
              alt={boss.name}
              className={classes.image}
            />
          </div>
          <div className={classes.rightContainer}>
            <Favorite isFavorite={boss.favorite} onClick={toggleFavorite} />
            {boss.lastSeen && (
              <Tooltip
                title={`Última vez visto: ${daysLastSeen} dia${
                  daysLastSeen > 1 ? "s" : ""
                } atrás`}
              >
                <div className={classes.lastSeen}>
                  <LastSeenIcon />
                  <Typography variant="body2" className={classes.previewText}>
                    {`${daysLastSeen}d`}
                  </Typography>
                </div>
              </Tooltip>
            )}
          </div>
        </div>
        <div className={classes.cardContent}>
          {boss.multiLocation ? (
            <Tooltip title="Boss presente em múltiplas cidades, com a chance sendo calculada como a média entre elas, não individualmente.">
              {bossName()}
            </Tooltip>
          ) : (
            bossName()
          )}

          <div className={classes.lastCheck}>
            {listModeSelected === "Todos" && (
              <Typography
                variant="caption"
                className={
                  boss.multiLocation
                    ? classes.multiLocation
                    : classes.singleLocation
                }
              >
                {boss.multiLocation && boss.city}
              </Typography>
            )}

            <Typography variant="body2" className={classes.lastCheckLabel}>
              {getBossCheckLabel()}
            </Typography>
            <Typography variant="body2" className={classes.lastCheckTimestamp}>
              {getBossTime(boss)} {timeSinceLastCheck()}
            </Typography>
          </div>
          <div
            className={`${classes.materialButtonStyle} ${
              isDisabledToCheck() ? classes.disabled : ""
            }`}
            onClick={() => !isDisabledToCheck() && handleCheck(boss)}
          >
            {getButtonTextCTA()}
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default BossCard;
