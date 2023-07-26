import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useFilterContext } from '../context/FilterContext'; // Step 1: Import the useFilterContext hook
import FilterButton from '../components/FilterButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    padding: '16px',
    minHeight: '100vh',
    width: '300px', 
    minWidth: '300px',
  },
  title: {
    color: 'white',
  },
  filterSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',

    marginTop: '8px',
    marginBottom: '8px',
  },
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const Filters = ({ visible }) => {
  const classes = useStyles();

  // Access the filter context using the useFilterContext hook
  const {
    cityButtons,
    chanceButtons,
    handleFilterClick,
  } = useFilterContext();

  if (!visible) return null; // If not visible, don't render anything

  return (
    <div className={classes.root}>
      <h2 className={classes.title}>Filtros</h2>
      <div className={classes.filterSection}>
        {/* City Filter */}
        <div className={classes.label}>Cidades</div>
        <div className={classes.buttonContainer}>
          {cityButtons.map((city) => (
            <FilterButton key={city.name} name={city.name} type="city" handleClick={() => handleFilterClick({...city, type: 'city'})}/>
          ))}
        </div>

        {/* Chance Filter */}
        <div className={classes.label}>Chance</div>
        <div className={classes.buttonContainer}>
          {chanceButtons.map((chance) => (
            <FilterButton key={chance.name} name={chance.name} type="chance" handleClick={() => handleFilterClick({...chance, type: 'chance'})}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
