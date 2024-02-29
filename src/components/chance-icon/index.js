import React from "react";
import {
  getChanceLabel,
  getChanceStyle,
  getFormattedChance,
} from "utils/chances";
import { isFullMoonDate } from "utils/date";

import { useStyles } from "./styles";

const ChanceIcon = (props) => {
  const { wip, chance } = props;
  let localChance = isFullMoonDate() ? 1 : chance;
  const classes = useStyles();
  const chanceLabel = wip ? "WIP" : getChanceLabel(localChance);
  const formattedChance = wip ? "?" : getFormattedChance(localChance);
  const style = wip ? "wip" : getChanceStyle(localChance);
  return (
    <div className={`${classes.chanceCircle} ${classes[style]}`}>
      <span className={classes.chanceLabel}>{chanceLabel}</span>
      <span className={classes.chanceValue}>{formattedChance}</span>
    </div>
  );
};

export default ChanceIcon;
