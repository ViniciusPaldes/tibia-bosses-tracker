import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useFilterContext } from '../context/FilterContext';
import { FilterList } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  appBar: {
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold'
  },
  badge: {
    top: 5,
    right: 5,
  },

  badgeContent: {
    backgroundColor: '#C06605', // Set the background color of the number on the badge
    fontWeight: 'bold', // Make the label bold
  },
}));

const MainAppBar = ({ handleTimeline, timelineOpen, handleFilter }) => {
  const classes = useStyles();
  const { selectedFilters } = useFilterContext(); // Access the selectedFilters from the filter context

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton color="inherit" onClick={handleFilter}>
          <Badge
            color="secondary"
            badgeContent={selectedFilters.length}
            className={classes.badge}
            classes={{ badge: classes.badge }} // Apply the badge class styles
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {selectedFilters.length > 0 ? (
              <FilterList className={classes.filterIcon} />
            ) : (
              <FilterList />
            )}
          </Badge>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Check Boss - Tibia
        </Typography>

        <IconButton edge="start" color="inherit" onClick={handleTimeline}>
          {timelineOpen ? <CloseIcon /> : <MenuOpenIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
