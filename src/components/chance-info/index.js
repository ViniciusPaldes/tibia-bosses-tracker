import React from "react";
import { countChances } from "utils/bosses";

import { useStyles } from "./style";

export const ChanceInfo = ({ bosses }) => {
  const classes = useStyles();
  const { alta, media, baixa, semChance, wip } = countChances(bosses);

  return (
    <div className={classes.chanceInfo}>
      {alta > 0 && <span className="alta">{`${alta} em alta`}</span>}
      {media > 0 && (alta > 0 ? `, ` : null)}
      {media > 0 && <span className="media">{`${media} média`}</span>}
      {baixa > 0 && (alta > 0 || media > 0 ? `, ` : null)}
      {baixa > 0 && <span className="baixa">{`${baixa} baixa`}</span>}
      {semChance > 0 && (alta > 0 || media > 0 || baixa > 0 ? `, ` : null)}
      {semChance > 0 && (
        <span className="semChance">{`${semChance} sem chance`}</span>
      )}
      {wip > 0 &&
        (alta > 0 || media > 0 || baixa > 0 || semChance > 0 ? `, ` : null)}
      {wip > 0 && <span className="wip">{`${wip} em construção`}</span>}
    </div>
  );
};
