import { Drawer, useMediaQuery, useTheme } from "@material-ui/core";
import FilterButton from "components/filter-button";
import { useFilterContext } from "context/FilterContext";
import React from "react";

import { useStyles } from "./styles";

const Filters = ({ visible, onClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { cityButtons, chanceButtons, handleFilterClick } = useFilterContext();

  if (!visible) return null;

  const children = () => {
    return (
      <div className={classes.root}>
        <h2 className={classes.title}>Filtros</h2>
        <div className={classes.filterSection}>
          {/* City Filter */}
          <div className={classes.label}>Cidades</div>
          <div className={classes.buttonContainer}>
            {cityButtons.map((city) => (
              <FilterButton
                key={city.name}
                name={city.name}
                type="city"
                handleClick={() => handleFilterClick({ ...city, type: "city" })}
              />
            ))}
          </div>

          {/* Chance Filter */}
          <div className={classes.label}>Chance</div>
          <div className={classes.buttonContainer}>
            {chanceButtons.map((chance) => (
              <FilterButton
                key={chance.name}
                name={chance.name}
                type="chance"
                handleClick={() =>
                  handleFilterClick({ ...chance, type: "chance" })
                }
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (isMobile) {
    return (
      <Drawer open={visible} variant="temporary" onClose={onClose}>
        {children()}
      </Drawer>
    );
  } else {
    return children();
  }
};

export default Filters;
