import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { AuthContext } from "context/auth";
import LoggedNavigation from "navigation/logged";
import NonLoggedNavigation from "navigation/non-logged";
import React, { useContext } from "react";
import NotAvailable from "screens/not-available";
import { theme } from "theme";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* {!user ? <NonLoggedNavigation /> : <LoggedNavigation user={user} />} */}
      <NotAvailable />
    </ThemeProvider>
  );
}

export default App;
