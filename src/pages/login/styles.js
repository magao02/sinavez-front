import styled from 'styled-components';
import theme from '../../styles/theme';

export const Container = styled.div`
    width: 100vw;

    display: grid;
    grid-template-columns: 41% 59%;
    align-items: center;
    justify-content: center;

    @media (max-width: 2560px) {
        grid-template-columns: 40% 60%;
    }

    @media (max-width: 1920px) {
        grid-template-columns: 45% 55%;
    };

    @media (max-width: 1024px) {
        grid-template-columns: 55% 45%;
    };

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        height: 100vh;
    };
`;

export const LoginSection = styled.section`
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 9.6rem 13.4rem 13.3rem 13.4rem;

    background-color: ${theme.colors.white};

    @media (max-width: 1024px) {
        padding: 5.0rem 10.4rem;
`;

export const Center = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;

    span {
        font-size: 1.4rem;
    }

    a {
        font-weight: bold;
        color: ${theme.colors.red}
    }
`;

export const DecorativeSection = styled.section`
    width: 100%;
    height: 100%;

    background: radial-gradient( closest-side, 
    ${theme.colors.blue['light']} 100%, 
    ${theme.colors.blue['light']} 1%,
    ${theme.colors.blue['light']} 2%  
    );

    image {
        display: none;
    }

    @media (max-width: 2560px) {
        height: 100vh;

    @media (max-width: 776px) {
        display: none;
    }
`;

export const Title = styled.h1`
    font-size: 4.4rem;
`;

export const SubTitle = styled.p`
    font-size: 1.6rem;
`;

export const GreetingsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    

    padding-bottom: 5.6rem;

    @media (max-width: 1920px) {
        gap: 0.8rem;
    };
`;

export const InputContainer = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    gap: 1.6rem;

    padding-bottom: 0.8rem;

    @media (max-width: 320px) {
        padding-bottom: 1.5rem;
    };
`;

export const Link = styled.a`
    color: ${theme.colors.dark.heavy};
    align-self: flex-end;
`;
