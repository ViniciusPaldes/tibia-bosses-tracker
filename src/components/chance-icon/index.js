import { Tooltip } from "@material-ui/core";
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
  if (boss.wip) {
    return <></>;
  }
  const chanceLabel = getChanceLabel(localChance);
  const formattedChance = getFormattedChance(localChance);
  const style = getChanceStyle(localChance);

  return (
    <div className={`${classes.chanceCircle} ${classes[style]}`}>
      <span className={classes.chanceLabel}>{chanceLabel}</span>
      <span className={classes.chanceValue}>{formattedChance}</span>
    </div>
  );
};

export default ChanceIcon;
