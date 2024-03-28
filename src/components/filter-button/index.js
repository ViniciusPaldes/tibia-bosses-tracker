import Chip from '@material-ui/core/Chip';
import { useTheme } from '@material-ui/core/styles';
import { useFilterContext } from 'context/FilterContext';
import React from 'react';

import { useStyles } from './style';


const FilterButton = ({ name, type, handleClick, options }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { cityButtons, chanceButtons, favoritesOnly } = useFilterContext();
  const buttons = type === 'city' ? cityButtons : type === 'chance' ? chanceButtons : type === 'listOption' && options ? options : [];
  let selected =  buttons.find((button) => button.name === name)?.selected;
  if (favoritesOnly && type === 'favorite') {
    selected = true;
  }
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
