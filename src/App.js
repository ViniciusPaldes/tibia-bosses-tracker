import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainAppBar from './components/MainAppBar';
// import BossDetail from './components/BossDetail';
// import AdminPage from './components/AdminPage';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './screen/Home';
import Timeline from './screen/Timeline';
import Filters from './screen/Filters';
import { FilterProvider } from './context/FilterContext';
import Releases from './screen/Releases';

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

  const switchTimelineVisibility = () => {
    setTimelineOpen(!timelineOpen)
  }

  const switchFiltersVisibility = () => {
    setFiltersOpen(!filtersOpen)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <FilterProvider>
          <MainAppBar handleTimeline={switchTimelineVisibility} timelineOpen={timelineOpen} handleFilter={switchFiltersVisibility} filtersOpen={filtersOpen} />
          <div style={{ display: 'flex' }}>
            <Filters visible={filtersOpen} />
            <div style={{ flexGrow: 1, padding: '16px' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/releases" element={<Releases />} />
                {/* <Route path="/boss/:id" element={<BossDetail />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/work" element={<DependencyList />} /> */}
              </Routes>
            </div>
            <Timeline visible={timelineOpen} />
          </div>
        </FilterProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
