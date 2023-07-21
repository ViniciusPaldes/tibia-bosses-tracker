import React, { createContext, useState, useContext } from 'react';

// Create the context
const FilterContext = createContext();

// Create the context provider component
const FilterProvider = ({ children }) => {
  const [cityButtons, setCityButtons] = useState({
    venore: false,
    thais: false,
    libertyBay: false,
    portHope: false,
    carlin: false,
    svargrond: false,
    varias: false,
    darashia: false,
    farmine: false,
    edron: false,
    abDendriel: false,
    roshamuul: false,
    ankrahmun: false,
    kazordoon: false,
    // Add more city buttons as needed
  });

  const [chanceButtons, setChanceButtons] = useState({
    alta: false,
    media: false,
    semChance: false,
    // Add more chance buttons as needed
  });

  // Logic to update the selectedFilters array based on the selected buttons
  // You can adapt this logic based on your specific filtering requirements
  const selectedFilters = [
    ...Object.keys(cityButtons).filter((city) => cityButtons[city]),
    ...Object.keys(chanceButtons).filter((chance) => chanceButtons[chance]),
  ];

  return (
    <FilterContext.Provider value={{ cityButtons, setCityButtons, chanceButtons, setChanceButtons, selectedFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use the filter context
const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};

export { FilterProvider, useFilterContext };
