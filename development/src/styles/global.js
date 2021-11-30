import { createGlobalStyle } from "styled-components";
import theme from './theme';

const GlobalStyles = createGlobalStyle`
    *,
    *:before,
    *:after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        font-size: 62.5%;

        @media (max-width: 768px) {
            font-size: 54.5%;
        }

        @media (max-width: 375px) {
            font-size: 50%;
        }
    }

    body, button, input, select, textarea {
        font-family: 'Roboto', sans-serif;
        font-size: 1.6rem;
    } 

    body {
        height: 100%;
        overflow-x: hidden;
        background-color: ${theme.colors.white};
    }

    button {
        cursor: pointer;
    }

    h1 {
        font-size: 4.4rem;
        color: ${theme.colors.dark.heavy};
    }

    p {
        font-size: 1.6rem;
        color: ${theme.colors.dark.heavy};
        font-weight: 400;
    }
`;


export default GlobalStyles;