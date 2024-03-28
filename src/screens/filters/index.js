import FilterButton from 'components/filter-button';
import { useFilterContext } from 'context/FilterContext';
import { ListOptionsContext, options } from 'context/list-options';
import React, { useContext, useEffect } from 'react';

import { useStyles } from './styles';

const Filters = ({ visible }) => {
  const classes = useStyles();
  const { listMode, setListMode } = useContext(ListOptionsContext);

  const {
    cityButtons,
    chanceButtons,
    handleFilterClick,
  } = useFilterContext();

  if (!visible) return null;

  const changeListMode = (option) => {
    setListMode((prev) => (
      prev.map((item) => {
        return item.name === option.name
          ? { ...item, selected: true }
          : { ...item, selected: false };
      })
    ));
  }


  return (
    <div className={classes.root}>
      <h2 className={classes.title}>Visualizar por</h2>
      <div className={classes.buttonContainer}>
        {listMode.map((option) => (
          <FilterButton key={option.name} name={option.name} type='listOption' handleClick={() => changeListMode(option)} options={listMode}/>
        ))}
      </div>
      <h2 className={classes.title}>Filtros</h2>
      <div className={classes.filterSection}>
        <div className={classes.label}>Seu check atual</div>
        <div className={classes.buttonContainer}>
            <FilterButton key="favorite" name="Favoritos" type="favorite" handleClick={() => handleFilterClick({type: 'favorite'})}/>
        </div>

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
