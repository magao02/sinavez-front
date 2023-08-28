import styled, { keyframes } from 'styled-components';
import theme from './theme';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    position: fixed;
    justify-content: space-between;
`

export const LeftContent = styled.div`
    display: flex;

    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: start;

    z-index: 2;
    margin-left: 61px;

    max-width: 40vw;
    img {
        max-height: 70vh;
    }
`;

export const RightContent = styled.div`
    display: flex;

    align-items: center;
    flex-direction: column;
    justify-content: center;

    margin-right: 10%;
    @media (max-height: 779px) {
        scale: 90%;
    }
    @media (max-height: 676px) {
        scale: 80%;
    }
`

export const PatternBox = styled.div`
    position: absolute;
    z-index: -10;

    opacity: 30%;
`

const FormBoxAnimation = flip => keyframes`
    from {
        opacity: 0%;
        transform: translateX(${flip ? "-10%" : "10%"});
    }
    to {
        opacity: 100%;
        transform: translateX(0%);
    }
`;

export const FormBox = styled.div`
    width: 35vw;

    display: flex;
    flex-direction: column;
    padding: 32px;
    align-items: flex-start;

    border-radius: 16px;
    border: 1px solid var(--azul-2, ${theme.colors.blue.border});

    animation: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) 0s ${props => FormBoxAnimation(props.flipAnimation)};

    @media (prefers-reduced-motion) {
        animation: none;
    }
`

export const MenuBox = styled.div`
    display: flex;

    justify-content: center;
    flex-direction: column;
    align-items: center;

    gap: 1.25vh;

    color: ${ props => props.blue ? `var(--text-accent, ${theme.colors.blue.heavy})` : `var(--background, ${theme.colors.white})`};
    text-align: center;

    font-size: 22px;
    font-weight: 600;
`

export const Title = styled.p`
    color: var(--text-accent, ${theme.colors.blue.heavy});
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 10px;
`

export const Steps = styled.div`
    display: flex;
    align-items: center;

    width: 70%;
    margin-bottom: 25px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;

  width: 100%;
  margin-top: 16px;
`;

export const StepDivider = styled.span`
    border-bottom: 1px solid gray;
    flex-grow: 1;
    margin: 0 10px;
`;

export const StepColor = styled.span`
    color: ${props => props.active ? "var(--azul-1, #043F79)" : "var(--text-secundary, #747880)"};
`;

export const StepNumber = styled.span`
    background: ${props => props.active ? "var(--azul-2, #032E58)" : "var(--text-primary, #3D3F45)"};
    
    width: 1.5em;
    height: 1.5em;
    border-radius: 100px;
    padding: 8px;
    
    color: #faffff;
    
    display: inline-flex;
    align-items: center;
    justify-items: center;
    justify-content: center;

    user-select: none;

    margin-right: 2px;
`;

export const SubmitError = styled.p`
    color: red;
    font-weight: bold;
    align-self: flex-end;
    margin-top: 15px;
`;

export const FormRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 38px;
`;