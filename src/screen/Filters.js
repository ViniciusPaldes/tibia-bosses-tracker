import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useFilterContext } from '../context/FilterContext'; // Step 1: Import the useFilterContext hook

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    padding: '16px',
    marginBottom: '16px', // Add some bottom margin to separate it from other content
  },
  title: {
    color: 'white',
  },
  filterSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '16px 0',
  },
  label: {
    color: 'white',
    marginBottom: '8px',
  },
  buttonContainer: {
    display: 'flex',
  },
  filterButton: {
    margin: '4px',
    padding: '8px 16px',
    borderRadius: '4px',
    color: 'white',
    backgroundColor: '#1976d2',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#135ba0',
    },
  },
}));

const Filters = ({ visible }) => {
  const classes = useStyles();

  // Step 2: Remove local state variables

  // Access the filter context using the useFilterContext hook
  const {
    cityButtons,
    setCityButtons,
    chanceButtons,
    setChanceButtons,
    selectedFilters,
  } = useFilterContext();

  // Step 3: Replace local state variables with the context state

  // Function to handle button click for city filters
  const handleCityButtonClick = (city) => {
    setCityButtons((prevState) => ({
      ...prevState,
      [city]: !prevState[city],
    }));
  };

  // Function to handle button click for chance filters
  const handleChanceButtonClick = (chance) => {
    setChanceButtons((prevState) => ({
      ...prevState,
      [chance]: !prevState[chance],
    }));
  };

  if (!visible) return null; // If not visible, don't render anything

  return (
    <div className={classes.root}>
      <h2 className={classes.title}>Pesquisa</h2>
      <div className={classes.filterSection}>
        {/* City Filter */}
        <div className={classes.label}>City:</div>
        <div className={classes.buttonContainer}>
          <button
            className={classes.filterButton}
            style={{
              backgroundColor: cityButtons.venore ? '#135ba0' : '#1976d2',
            }}
            onClick={() => handleCityButtonClick('venore')}
          >
            Venore
          </button>
          <button
            className={classes.filterButton}
            style={{
              backgroundColor: cityButtons.thais ? '#135ba0' : '#1976d2',
            }}
            onClick={() => handleCityButtonClick('thais')}
          >
            Thais
          </button>
          {/* Add more city buttons as needed */}
        </div>

        {/* Chance Filter */}
        <div className={classes.label}>Chance:</div>
        <div className={classes.buttonContainer}>
          <button
            className={classes.filterButton}
            style={{
              backgroundColor: chanceButtons.alta ? '#135ba0' : '#1976d2',
            }}
            onClick={() => handleChanceButtonClick('alta')}
          >
            Alta
          </button>
          <button
            className={classes.filterButton}
            style={{
              backgroundColor: chanceButtons.media ? '#135ba0' : '#1976d2',
            }}
            onClick={() => handleChanceButtonClick('media')}
          >
            Média
          </button>
          <button
            className={classes.filterButton}
            style={{
              backgroundColor: chanceButtons.semChance ? '#135ba0' : '#1976d2',
            }}
            onClick={() => handleChanceButtonClick('semChance')}
          >
            Sem chance
          </button>
          {/* Add more chance buttons as needed */}
        </div>
      </div>
      {/* Display the selected filters */}
      <div>
        Selected Filters: {selectedFilters.join(', ')}
      </div>
    </div>
  );
};

export default Filters;