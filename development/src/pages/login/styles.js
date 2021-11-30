import styled from 'styled-components';
import theme from '../../styles/theme';

export const Container = styled.div`
    width: 100vw;
    height: 100%;

    display: grid;
    grid-template-columns: 41% 59%;
    align-items: center;
    justify-content: center;
`;

export const LoginSection = styled.section`
    height: 100%;
    padding: 7.2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;

    gap: 1.6rem;
    background-color: ${theme.colors.white};
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const DecorativeSection = styled.section`
    height: 100%;

    background-color: ${theme.colors.blue['light']};
`

export const Title = styled.h1`
    padding-bottom: 1.6rem;
`;

export const SubTitle = styled.p`
    padding-bottom: 5.6rem;
`;

export const Link = styled.a`
    color: ${theme.colors.dark.heavy};
`;
