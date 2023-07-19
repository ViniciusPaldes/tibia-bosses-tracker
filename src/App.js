import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainAppBar from './components/MainAppBar';
// import BossDetail from './components/BossDetail';
// import AdminPage from './components/AdminPage';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './screen/Home';
import Sidebar from './screen/Sidebar';
// import DependencyList from './components/DependencyList';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

function App() {
  
  const [sidebarOpen, setSidebarOpen] = useState(null);

  const switchSidebarVisibility = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainAppBar handleClick={switchSidebarVisibility} sidebarOpen={sidebarOpen} />
        <div style={{ display: 'flex'}}>
          <Sidebar visible={sidebarOpen}/>
          <div style={{ flexGrow: 1, padding: '16px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/boss/:id" element={<BossDetail />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/work" element={<DependencyList />} /> */}
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
