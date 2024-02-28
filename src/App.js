import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainAppBar from 'components/main-app-bar';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from 'screens/home';
import Filters from 'screens/filters';
import Releases from 'screens/releases';
import Timeline from 'screens/timeline';
import { FilterProvider } from './context/FilterContext';
import { useFetchBosses } from 'services/firebase-service';
import { PacmanLoader } from 'react-spinners';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
  palette: {
    primary: {
      main: '#3f51b5',
    },
    primaryDark: {
      main: '#135ba0',
    },
    secondary: {
      main: '#C06605'
    },
    tertiary: {
      main: '#C06605',
    },
    tertiaryChip: {
      main: '#C06605',
    },
    unselected: {
      main: '#132584', // Change this to the desired darker color than #00aaff
    },
  },
  // Define a custom color for unselected state
  
});

function App() {

  const [timelineOpen, setTimelineOpen] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(null);

  const bosses = useFetchBosses();

  const switchTimelineVisibility = () => {
    setTimelineOpen(!timelineOpen)
  }

  const switchFiltersVisibility = () => {
    setFiltersOpen(!filtersOpen)
  }

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (bosses.length > 1) {
      setLoading(false);
    }
  }, [bosses])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <FilterProvider>
          <MainAppBar handleTimeline={switchTimelineVisibility} timelineOpen={timelineOpen} handleFilter={switchFiltersVisibility} filtersOpen={filtersOpen} />
          {loading ?
            <div style={{display: "flex", justifyContent: "center", margin: 32}}>
              <PacmanLoader color="#3f51b5" />
            </div>
          : 
            <div style={{ display: 'flex' }}>
              <Filters visible={filtersOpen} />
              <div style={{ flexGrow: 1, padding: '16px' }}>
                <Routes>
                  <Route path="/" element={<Home bosses={bosses} />} />
                  <Route path="/releases" element={<Releases />} />
                </Routes>
              </div>
              <Timeline visible={timelineOpen} bosses={bosses} />
            </div>
          }
        </FilterProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
