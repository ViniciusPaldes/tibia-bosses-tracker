import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainAppBar from './components/MainAppBar';
import BossDetail from './components/BossDetail';
import AdminPage from './components/AdminPage';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './screen/Home';
import Sidebar from './screen/Sidebar';

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
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flexGrow: 1, padding: '16px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/boss/:id" element={<BossDetail />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
