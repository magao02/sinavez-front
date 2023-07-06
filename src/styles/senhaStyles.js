import styled from "styled-components";
import theme from './theme';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${theme.colors.blue.heavy};

    display: flex;
`;

export const ContentSection = styled.section`
    width: 100%;
    min-width: 300px;
    max-width: 2560px;

    background-color: ${theme.colors.white.default};
    margin: 7.0rem 13.9rem 7.0rem 13.9rem;

    border-radius: 2.4rem;

    display: grid;
    grid-template-columns: 60% 40%;

    @media (max-width: 1300px) {
        grid-template-columns: 70% 30%;
    }

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;

        margin: 0;

        border-radius: 0;
    }
`;

export const PasswordSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    gap: 1.3rem;
    padding: 0 14.9rem 0 14.9rem;

    @media (min-width: 1450px) {
        padding: 0 22rem 0 22rem;;
    }

    @media (max-width: 1300px) {
        padding: 0 11.9rem 0 11.9rem;
    }

    @media (max-width: 768px) {
        padding: 0 5.2rem 0 5.2rem;
    }
`;

export const Greetings = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 2rem;
    padding-bottom: 4.2rem;
`;

export const Title = styled.h1`
    font-size: 4rem;
    text-align: center;

    @media (max-width: 1300px) {
        font-size: 2.9rem;
    }
`;

export const Subtitle = styled.h5`
    font-weight: normal;
    line-height: 2.4rem;
    text-align: center;
    opacity: 0.9;

    @media (min-width: 1680px) {
        font-size: 1.3rem;
    }

    @media (min-width: 1800px) {
        font-size: 1.5rem;
    }
`;

export const DecorativeSection = styled.section`
    background-color: ${theme.colors.alert};
    border-top-right-radius: 2.4rem;
    border-bottom-right-radius: 2.4rem;

    @media (max-width: 1024px) {
        display: none;
    }
`;

export const Span = styled.section`
    margin-top: 2.5vh;
    color: ${theme.colors.red};
    text-align: center;
    font-weight: bold;
`;