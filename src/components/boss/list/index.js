import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import BossCard from "../card";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useFilterContext } from "context/FilterContext";
import { useStyles } from "./styles";
import { CheckDialog } from "../dialog/check";
import { ChanceInfo } from "components/chance-info";

function UserFeedback(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

function BossesList({ bosses }) {
  const classes = useStyles();
  const BossCardMemo = React.memo(BossCard);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedBoss, setSelectedBoss] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationSuccess, setConfirmationSuccess] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleCheck = (boss) => {
    setSelectedBoss(boss);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setSelectedBoss(null);
  };

  const save = async ({success, message}) => {
    setConfirmationMessage(message);
    setConfirmationSuccess(success)
    setConfirmationOpen(true);
  }

  const handleConfirmationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setConfirmationOpen(false);
  };

  const { selectedFilters } = useFilterContext();

  const filterBosses = () => {
    // If no filters are selected, return all bosses
    if (selectedFilters.length === 0) {
      return bosses;
    }

    const selectedCities = selectedFilters
      .filter((filter) => filter.type === "city")
      .map((cityFilter) => cityFilter.name);

    const selectedChances = selectedFilters
      .filter((filter) => filter.type === "chance")
      .map((chanceFilter) => chanceFilter.name);

    // Filter bosses based on selected cities and chances
    const filteredBosses = bosses?.filter((boss) => {
      // Check if the boss's city is included in the selectedCities array
      let isCityMatch = true;
      if (selectedCities.length > 0) {
        isCityMatch = selectedCities.includes(boss.city);
      }
      // Check if the boss's chance is included in the selectedChances array
      let isChanceMatch = true;
      if (selectedChances.length > 0) {
        if (boss.wip) {
          return false;
        } else {
          isChanceMatch = selectedChances.includes(boss.chanceLabel);
        }
      }
      // Return true if both city and chance match, otherwise return false
      return isCityMatch && isChanceMatch;
    });

    return filteredBosses;
  };

  const bossesByCity = filterBosses().reduce((acc, boss) => {
    const bossCity = boss.city;
    if (acc[bossCity]) {
      acc[bossCity].push(boss);
    } else {
      acc[bossCity] = [boss];
    }
    // Sort bosses within the same type by chance (descending order)
    acc[bossCity].sort((a, b) => {
      if ((b.checkable && !a.checkable) || boss.wip) {
        // If 'b' is checkable and 'a' is not, 'b' comes first
        return 1;
      } else if (!b.checkable && a.checkable) {
        // If 'a' is checkable and 'b' is not, 'a' comes first
        return -1;
      } else {
        // If both have the same checkable value, sort by chance (descending order)
        return b.chance - a.chance;
      }
    });

    return acc;
  }, {});

  // Sort bossCity keys based on the count of items in each array (descending order)
  const sortedBossesByCityKeys = Object.keys(bossesByCity).sort(
    (cityA, cityB) => bossesByCity[cityB].length - bossesByCity[cityA].length
  );

  // Create a new object with sorted bossCity entries
  const sortedBossesByCity = {};
  sortedBossesByCityKeys.forEach((bossCity) => {
    sortedBossesByCity[bossCity] = bossesByCity[bossCity];
  });

  return (
    <div className={classes.main}>
      {Object.entries(sortedBossesByCity).map(([bossCity, bossList], index) => {
        // Count occurrences for each chance level
        return (
          <Accordion key={bossCity} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${bossCity}-content`}
              id={`panel-${bossCity}-header`}
              className={
                index % 2 === 0
                  ? classes.whiteBackground
                  : classes.greyBackground
              }
            >
              <div className={classes.accordionSummaryRoot}>
                <Typography
                  variant="h5"
                  component="h2"
                  color="primary"
                  className={classes.tableTitle}
                >
                  {bossCity}
                </Typography>
                <ChanceInfo bosses={bossList}/>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.gridContainer}>
              {bossList.map((boss) => (
                <React.Fragment key={boss.id}>
                  <BossCardMemo boss={boss} handleCheck={handleCheck} />
                </React.Fragment>
              ))}
            </AccordionDetails>
          </Accordion>
        );
      })}
      <CheckDialog
        boss={selectedBoss}
        visible={dialogVisible}
        onClose={closeDialog}
        onSave={save}
      />

      <Snackbar
        open={confirmationOpen}
        autoHideDuration={3000}
        onClose={handleConfirmationClose}
      >
        <UserFeedback
          onClose={handleConfirmationClose}
          severity={
            confirmationSuccess ? "success": "error"
          }
        >
          {confirmationMessage}
        </UserFeedback>
      </Snackbar>
    </div>
  );
}

export default BossesList;
