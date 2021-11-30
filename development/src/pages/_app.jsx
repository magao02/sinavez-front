import { ThemeProvider } from 'styled-components';

import GlobalStyles from "../../src/styles/global";
import theme from './../styles/theme';

const App = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Component  {...pageProps} />
        </ThemeProvider>
    );
};

export default App;