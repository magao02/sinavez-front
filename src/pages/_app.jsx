import { ThemeProvider } from 'styled-components';
import { AuthContextProvider } from '../contexts/AuthContext';
import GlobalStyles from "../../src/styles/global";
import theme from './../styles/theme';

const App = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <AuthContextProvider>
                <GlobalStyles />
                <Component  {...pageProps} />
            </AuthContextProvider>
        </ThemeProvider>
    );
};

export default App;