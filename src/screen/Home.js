import React from 'react';
import KilledBosses from '../components/KilledBosses';
import BossList from '../components/BossList';
import { Chip, Typography, makeStyles } from '@material-ui/core';
import { useFilterContext } from '../context/FilterContext';
import WhiteDeleteIcon from '../components/WhiteDeleteIcon'; // Import the custom delete icon

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(3),
    fontWeight: 'bold',
    color: '#3f51b5',
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: theme.spacing(3),
    fontWeight: 'bold',
    color: '#555555',
    textAlign: 'center',
  },
  chip: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
    backgroundColor: theme.palette.tertiaryChip.main,
    opacity: 1,
    marginBottom: theme.spacing(2),
    color: 'white',
    fontWeight: 'bold',
  },
}));

const Home = () => {
  const classes = useStyles();
  const {
    selectedFilters,
    handleFilterClick,
  } = useFilterContext();

  return (
    <div>
      <KilledBosses />
      <Typography variant="h5" component="h2" className={classes.title}>
        Previsões de Venebra
      </Typography>
      {/* Display the selected filters */}

      <Typography variant="subtitle1" className={classes.subtitle}>
        {new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
      </Typography>
      {selectedFilters.map((filter) => (
        <Chip key={filter.name}  label={filter.name} className={classes.chip} onDelete={() => handleFilterClick(filter)} deleteIcon={<WhiteDeleteIcon />} // Use the custom delete icon
        />
      ))}
      <BossList />
    </div>
  );
};

export default Home;
