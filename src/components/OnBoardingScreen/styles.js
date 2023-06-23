import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
    position: absolute;

    background-color: #FFF;

    width: 100vw;
    height: 100vh;
`

export const Title = styled.p`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;

    color: var(--text-primary, ${theme.colors.gray.menu});
    font-size: 32px;
    font-weight: 700;
    line-height: 36px;
`

export const Text = styled.p`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;
    color: var(--text-primary, ${theme.colors.gray.menu});

    width: 30vw;

    font-size: 18px;
    font-family: Roboto;
    line-height: 22px;
`

export const TextBox = styled.div`
    display: flex;

    position: relative;

    flex-direction: column;

    gap: 2vh;

    top: 30vh;
    left: 10vw;
    
    button {
        margin-top: 1vh;
    }
`

export const Character = styled.div`
    display: flex;

    position: relative;

    left: 40vw;
    bottom: 10vh;

    z-index: 2;
`

export const Pattern = styled.div`
    display: flex;

    position: relative;

    opacity: 50%;

    left: 55vw;
    bottom: 104vh;
`