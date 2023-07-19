import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

const useStyles = makeStyles((theme) => ({
  appBar: {
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold'
  },
}));

const MainAppBar = ({ handleClick, sidebarOpen }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleClick}>
          {sidebarOpen ? <ArrowBackIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Tibia Bosses Tracker
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
