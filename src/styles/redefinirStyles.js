import styled from 'styled-components';
import theme from '../styles/theme';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${theme.colors.white};

    display: flex;
    flex-direction: column;
`;

export const ContentContainer = styled.div`
    width: 80%;
    height: 100%;

    margin: 1.9rem 13.9rem;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    gap: 5.5rem;

    border: 1px solid black;
    border-radius: 2rem;
`;