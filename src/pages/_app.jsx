import { ThemeProvider } from "styled-components";
import { AuthContextProvider } from "../contexts/AuthContext";
import { AdminContextProvider } from '../contexts/AdminContext';
import GlobalStyles from "../../src/styles/global";
import theme from "./../styles/theme";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <AdminContextProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </AdminContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
