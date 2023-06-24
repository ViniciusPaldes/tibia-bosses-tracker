// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainAppBar from './components/MainAppBar';
import BossList from './components/BossList';
import BossDetail from './components/BossDetail';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainAppBar />
        <Routes>
          <Route path="/" element={<BossList />} />
          <Route path="/boss/:id" element={<BossDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
