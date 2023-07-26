import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useFilterContext } from '../context/FilterContext';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  filterButton: {
    margin: '4px',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    '& .MuiChip-label': {
      color: 'white',
      padding: '8px 16px',
    },
  },
}));

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
