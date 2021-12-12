import styled from 'styled-components';
import theme from '../../styles//theme';

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

export const InputForm = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: repeat(3, 1fr);

    gap: 5.6rem;

    padding: 12.7rem 14rem 12.7rem 14rem;

`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
`;