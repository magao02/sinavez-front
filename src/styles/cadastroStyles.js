import styled from 'styled-components';
import theme from './theme';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: grid;
    grid-template-rows: 11% 89%;
    grid-template-columns: 1fr;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;


export const MainContent = styled.main`
    width: 100%;
    height: 100%;

    background-color: ${theme.colors.white};
`;

