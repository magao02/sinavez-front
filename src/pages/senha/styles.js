import styled from "styled-components";
import theme from '../../styles/theme';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${theme.colors.blue.heavy};

    display: flex;

`;

export const ContentSection = styled.section`
    width: 100%;
    background-color: ${theme.colors.white};
    margin: 7.0rem 13.9rem 7.0rem 13.9rem;

    border-radius: 2.4rem;

    display: grid;
    grid-template-columns: 60% 40%;

`;

export const PasswordSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.3rem;

    padding: 0 14.9rem 0 14.9rem;

    
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
`;

export const Subtitle = styled.p`
    font-size: 1rem;
    line-height: 2.4rem;
    text-align: center;
    opacity: 0.9;
`;

export const DecorativeSection = styled.section`
    background-color: ${theme.colors.alert};
    border-top-right-radius: 2.4rem;
    border-bottom-right-radius: 2.4rem;
`;
