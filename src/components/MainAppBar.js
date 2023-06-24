import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold'
  },
}));


const MainAppBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
      <Typography variant="h6" className={classes.title}>
            Tibia Bosses Tracker
          </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
