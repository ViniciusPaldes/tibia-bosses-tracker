import { Chip, Typography } from "@material-ui/core";
import BossList from "components/boss/list";
import KilledBosses from "components/killed-bosses";
import WhiteDeleteIcon from "components/white-delete-icon";
import { useFilterContext } from "context/FilterContext";
import React from "react";
import { getTodaysTimestamp } from "utils/date";

import { useStyles } from "./styles";

const Home = ({ bosses }) => {
  const classes = useStyles();
  const { selectedFilters, handleFilterClick } = useFilterContext();
  const { start, end } = getTodaysTimestamp();
  return (
    <div>
      <KilledBosses bosses={bosses} />
      <Typography variant="h5" component="h2" className={classes.title}>
        Previsões para Venebra
      </Typography>
      <Typography variant="subtitle1" className={classes.subtitle}>
        {start.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
        &nbsp; até &nbsp;
        {end.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
        , 05:00 AM
      </Typography>
      {selectedFilters.map((filter) => {
        if (filter.type === "favorite" && !filter.selected) {
          return;
        } else {
          return (
            <Chip
              key={filter.name}
              label={filter.name}
              className={classes.chip}
              onDelete={() => handleFilterClick(filter)}
              deleteIcon={<WhiteDeleteIcon />}
            />
          );
        }
      })}
      <BossList bosses={bosses} />
    </div>
  );
};

export default Home;
