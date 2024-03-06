import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import MainAppBar from 'components/main-app-bar';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import Filters from 'screens/filters';
import Home from 'screens/home';
import Releases from 'screens/releases';
import Timeline from 'screens/timeline';
import { useFetchBosses } from 'services/firebase-service';
import { useStyles } from 'styles';
import { theme } from 'theme';

import { FilterProvider } from './context/FilterContext';


function App() {
  const classes = useStyles();
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
            <div className={classes.loader}>
              <PacmanLoader color="#3f51b5" />
            </div>
          : 
            <div className={classes.app}>
              <Filters visible={filtersOpen} onClose={switchFiltersVisibility} />
              <div className={classes.routes}>
                <Routes>
                  <Route path="/" element={<Home bosses={bosses} />} />
                  <Route path="/releases" element={<Releases />} />
                </Routes>
              </div>
              <Timeline visible={timelineOpen} bosses={bosses} onClose={switchTimelineVisibility} />
            </div>
          }
        </FilterProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
