import React from 'react';
import KilledBosses from 'components/killed-bosses';
import BossList from 'components/boss/list';
import { Chip, Typography } from '@material-ui/core';
import { useFilterContext } from 'context/FilterContext';
import WhiteDeleteIcon from 'components/white-delete-icon'; // Import the custom delete icon
import { useStyles } from './styles';

const Home = ({bosses}) => {
  const classes = useStyles();
  const {
    selectedFilters,
    handleFilterClick,
  } = useFilterContext();

  return (
    <div>
      <KilledBosses bosses={bosses}/>
      <Typography variant="h5" component="h2" className={classes.title}>
        Previsões para Venebra
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
      <BossList bosses={bosses} />
    </div>
  );
};

export default Home;
