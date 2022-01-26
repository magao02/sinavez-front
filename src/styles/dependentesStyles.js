import styled from "styled-components";
import theme from './theme';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${theme.colors.white};

    display: flex;
    flex-direction: column;
`;

export const ContentContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const ControllerContainer = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 2.3rem;

    padding-top: 5rem;
`;