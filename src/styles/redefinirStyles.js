import styled from 'styled-components';
import theme from '../styles/theme';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const MainContent = styled.main`
    width: 100%;
    height: 100%;

    background-color: ${theme.colors.white};
`;