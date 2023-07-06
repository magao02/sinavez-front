import styled from "styled-components";
import theme from './theme';

export const Container = styled.div`
    width: 100vw;
 
    display: flex;
    flex-direction: column;
`;

export const Main = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20vh;
    margin-left: -42.5vw;
`;

export const Title = styled.h1`
    color: var(--text-primary, ${theme.colors.gray.menu});

    font-size: 32px;
    font-weight: 700;
    line-height: 36px;
`

export const MainContainer = styled.div`
    margin-top: 14vh;
    margin-left: 7.5vw;

    display: flex;
    flex-direction: column;

    gap: 3vh;
`

export const MainHead = styled.div`
    display: flex;
    gap: 46vw;
`

export const AddAssociateBox = styled.div`
    position: absolute;

    left: 50%;
    top: 15%;

    margin-left: -15vw;
`