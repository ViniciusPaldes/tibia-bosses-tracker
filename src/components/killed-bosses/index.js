import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";

import KilledBossItem from "./item";
import { useStyles } from "./styles";

const KilledBosses = ({ bosses }) => {
  const classes = useStyles();
  const bossesWithKilledYesterdayAndUniqueNames = bosses
    ?.filter((boss) => boss.killedYesterday > 0)
    .reduce((uniqueBosses, boss) => {
      if (!uniqueBosses[boss.name]) {
        uniqueBosses[boss.name] = boss;
      }
      return uniqueBosses;
    }, {});

  const uniqueBossesArray = Object.values(
    bossesWithKilledYesterdayAndUniqueNames
  );
  return (
    <Grid container>
      <Grid item xs={12}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="killed-bosses-content"
            id="killed-bosses-header"
          >
            <Typography variant="h5" className={classes.title}>
              Bosses mortos ontem
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.content}>
            <div className={classes.listContainer}>
              {uniqueBossesArray.map((boss) => (
                <KilledBossItem key={boss.id} boss={boss} />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default KilledBosses;
