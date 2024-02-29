import Chip from '@material-ui/core/Chip';
import { useTheme } from '@material-ui/core/styles';
import { useFilterContext } from 'context/FilterContext';
import React from 'react';

import { useStyles } from './style';


const FilterButton = ({ name, type, handleClick }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { cityButtons, chanceButtons } = useFilterContext();

  const buttons = type === 'city' ? cityButtons : chanceButtons;
  const selected = buttons.find((button) => button.name === name)?.selected;

  return (
    <Chip
      label={name}
      className={classes.filterButton}
      style={{
        backgroundColor: selected
          ? theme.palette.tertiary.main
          : theme.palette.unselected.main,
      }}
      onClick={handleClick}
      clickable
    />
  );
};

export default FilterButton;
