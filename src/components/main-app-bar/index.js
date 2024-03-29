import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import ExitToAppIcon from '@material-ui/icons/ExitToApp'; 
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import { useFilterContext } from "context/FilterContext";
import React from "react";
import { Link } from "react-router-dom";
import { logout } from "services/firebase-service";

import { useStyles } from "./styles";

const MainAppBar = ({ handleTimeline, timelineOpen, handleFilter }) => {
  const classes = useStyles();
  const { selectedFilters, thereIsNoFilters } = useFilterContext(); // Access the selectedFilters from the filter context

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton color="inherit" onClick={handleFilter}>
          <Badge
            color="secondary"
            badgeContent={thereIsNoFilters() ? 0 :selectedFilters.length}
            className={classes.badge}
            overlap="rectangular"
            classes={{ badge: classes.badge }} // Apply the badge class styles
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {thereIsNoFilters() ? (
              <FilterList className={classes.filterIcon} />
            ) : (
              <FilterList />
            )}
          </Badge>
        </IconButton>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
        >
          <Typography variant="h6" className={classes.title}>
            Check Boss - Tibia
          </Typography>
        </Link>

        <IconButton color="inherit" onClick={logout}>
          <ExitToAppIcon />
        </IconButton>

        <Link
          to="/releases"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <IconButton color="inherit">
            <NewReleasesIcon />
          </IconButton>
        </Link>

        <IconButton edge="start" color="inherit" onClick={handleTimeline}>
          {timelineOpen ? <CloseIcon /> : <MenuOpenIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
