import styled from "styled-components";
import theme from "./theme";

export const Container = styled.div`
    position: relative;

    display: flex;
    width: ${props => props.width ? '40vw' : '50vw'};
    height: 100vh;
    top: 77px;
}
`

export const TextBox = styled.div`
    width: 40vw;

    position: relative;

    top: 18vh;
    left: 10vw;

    display: flex;
    flex-direction: column;
    gap: 1vh;
`

export const Title = styled.div`
    display: flex;
    width: 416px;
    flex-direction: column;
    justify-content: center;
    color: var(--text-primary, ${theme.colors.gray.menu});

    font-size: 32px;
    font-weight: 700;
    line-height: 36px;
`

export const Text = styled.div`
    display: flex;
    width: 416px;
    flex-direction: column;
    justify-content: center;
    color: var(--text-primary, ${theme.colors.gray.menu});

    font-size: 18px;
    font-family: Roboto;
    line-height: 22px;

    margin-bottom: 3vh;
`

export const StepsBox = styled.div`
    margin-bottom: 4vh;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 1vh;

`

export const StepDivider = styled.div`
    width: 24px;
    height: 30px;

    background-color: grey/400;
`

export const LinkBox = styled.div`
    margin-top: 2vh;
    
    display: flex;
    align-items: center;
    padding: 0px 1vw;
    gap: 0.5vw;

    width: 10vw;

    text-decoration: none;
    color: var(--azul-0, ${theme.colors.blue.heavy});
    font-size: 14px;
    font-family: Roboto;
    font-weight: 500;
    line-height: 20px;
    text-transform: uppercase;

    &:hover {
        cursor: pointer;
    }
`
export const ContainerTutorial = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
`; 

export const ContainerImage = styled.div`
    width: 60vw;
    height: 127vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    right: 0;
`;

export const DarkImage = styled.div`
    width: 60vw;
    height: 135vh;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 50%;
    position: absolute;
    right: 0;
    z-index: 0;
`;
