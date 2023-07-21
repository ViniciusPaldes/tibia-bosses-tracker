import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

const useStyles = makeStyles((theme) => ({
  appBar: {
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold'
  },
}));

const MainAppBar = ({ handleTimeline, timelineOpen, handleFilter }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        {/* <IconButton color="inherit" onClick={handleFilter}>
          {timelineOpen ? <TuneIcon/> : <TuneIcon />}
        </IconButton> */}
        <Typography variant="h6" className={classes.title}>
          Check Boss - Tibia
        </Typography>
        
        <IconButton edge="start" color="inherit" onClick={handleTimeline}>
          {timelineOpen ? <CloseIcon/> : <MenuOpenIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
