import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { useFilterContext } from "../../context/FilterContext";
import { FilterList } from "@material-ui/icons";
import { Link } from "react-router-dom";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import { useStyles } from "./styles";

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
              vertical: "top",
              horizontal: "right",
            }}
          >
            {selectedFilters.length > 0 ? (
              <FilterList className={classes.filterIcon} />
            ) : (
              <FilterList />
            )}
          </Badge>
        </IconButton>
        <Link to="/" style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}>
          <Typography variant="h6" className={classes.title}>
            Check Boss - Tibia
          </Typography>
        </Link>

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
