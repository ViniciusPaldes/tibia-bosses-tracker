import React from "react";
import {
  getChanceLabel,
  getChanceStyle,
  getFormattedChance,
} from "utils/chances";
import { isFullMoonActive } from "utils/date";

import { useStyles } from "./styles";

const ChanceIcon = (props) => {
  const { boss } = props;
  let localChance = isFullMoonActive(boss) ? 1 : boss.chance;
  const classes = useStyles();
  const chanceLabel = boss.wip ? "WIP" : getChanceLabel(localChance);
  const formattedChance = boss.wip ? "?" : getFormattedChance(localChance);
  const style = boss.wip ? "wip" : getChanceStyle(localChance);
  return (
    <div className={`${classes.chanceCircle} ${classes[style]}`}>
      <span className={classes.chanceLabel}>{chanceLabel}</span>
      <span className={classes.chanceValue}>{formattedChance}</span>
    </div>
  );
};

export default ChanceIcon;
