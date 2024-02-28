import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { useStyles } from './style';
import { useFilterContext } from 'context/FilterContext';

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
