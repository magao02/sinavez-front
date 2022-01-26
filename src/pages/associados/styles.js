import styled from "styled-components";
import theme from '../../styles/theme';

export const Container = styled.div`
    width: 100vw;
    height: 100%;
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

    gap: 1.2rem;
`;

export const ControllerContainer = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 2.3rem;

    padding-top: 5rem;
`;