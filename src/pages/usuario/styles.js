import styled from "styled-components";
import theme from '../../styles/theme';

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

    border: 1px solid black;
    border-radius: 2rem;

`;

export const SubContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    gap: 4.2rem;

    padding: 1rem 8.4rem;
`;

export const UserTitle = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0 , 0.25);
    }
`;

export const Separator = styled.div`
    width: 100px;

    &::before, &::after {
        width: 100%;
        height: 0.2rem;

        content:'';

        display: flex;
        align-items: center;

        background: black;
        opacity: 0.0;
    }
`;