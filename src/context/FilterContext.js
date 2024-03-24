import React, { createContext, useState, useContext } from "react";

// Create the context
const FilterContext = createContext();

// Create the context provider component
const FilterProvider = ({ children }) => {
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const [cityButtons, setCityButtons] = useState([
    { name: "Ab'dendriel", selected: false },
    { name: "Ankrahmun", selected: false },
    { name: "Carlin", selected: false },
    { name: "Darashia", selected: false },
    { name: "Edron", selected: false },
    { name: "Farmine", selected: false },
    { name: "Kazordoon", selected: false },
    { name: "Liberty Bay", selected: false },
    { name: "Oskayaat", selected: false },
    { name: "Port Hope", selected: false },
    { name: "Roshamuul", selected: false },
    { name: "Svargrond", selected: false },
    { name: "Thais", selected: false },
    { name: "Várias", selected: false },
    { name: "Venore", selected: false },
    { name: "Bank Robbery", selected: false },
    // Add more city buttons as needed
  ]);

  const [chanceButtons, setChanceButtons] = useState([
    { name: "Alta", selected: false, value: 0.1 },
    { name: "Média", selected: false, value: 0.011 },
    { name: "Baixa", selected: false, value: 0.01 },
    { name: "Sem chance", selected: false, value: 0 },
  ]);

  // Logic to update the selectedFilters array based on the selected buttons
  // You can adapt this logic based on your specific filtering requirements
  const selectedFilters = [
    { type: "favorite", name: "Favoritos", selected: favoritesOnly },
    ...cityButtons
      .filter((cityButton) => cityButton.selected)
      .map((cityButton) => ({
        type: "city",
        ...cityButton,
      })),
    ...chanceButtons
      .filter((chanceButton) => chanceButton.selected)
      .map((chanceButton) => ({
        type: "chance",
        ...chanceButton,
      })),
  ];
  const thereIsFilters = () => {
    if (selectedFilters.length === 1 && selectedFilters[0].selected === false) {
      return false;
    } else {
      return true;
    }
  };

  const handleFilterClick = (filter) => {
    if (filter.type === "favorite") {
      setFavoritesOnly(!favoritesOnly);
    } else {
      if (filter.type === "city") {
        setCityButtons((prevState) =>
          prevState.map((city) =>
            city.name === filter.name
              ? { ...city, selected: !city.selected }
              : city
          )
        );
      } else if (filter.type === "chance") {
        setChanceButtons((prevState) =>
          prevState.map((chance) =>
            chance.name === filter.name
              ? { ...chance, selected: !chance.selected }
              : chance
          )
        );
      }
    }
  };

  return (
    <FilterContext.Provider
      value={{
        cityButtons,
        chanceButtons,
        selectedFilters,
        favoritesOnly,
        handleFilterClick,
        thereIsFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use the filter context
const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};

export { FilterProvider, useFilterContext };
