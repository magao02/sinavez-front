import { ThemeProvider } from "styled-components";
import { AuthContextProvider } from "../contexts/AuthContext";
import { AdminContextProvider } from '../contexts/AdminContext';
import GlobalStyles from "../../src/styles/global";
import theme from "./../styles/theme";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  return <>
    <Head>
      <title>Sinavez</title>
      <link rel="icon" href="/logo_sinavez.png" type="image/png" />
    </Head>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <AdminContextProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </AdminContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </>;
};

export default App;
