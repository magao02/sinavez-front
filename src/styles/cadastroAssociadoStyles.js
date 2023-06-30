import styled from 'styled-components';
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
`;

export const RightContent = styled.div`
    display: flex;

    align-items: center;
    flex-direction: column;
    justify-content: center;

    margin-right: 10%;
`

export const PatternBox = styled.div`
    position: absolute;
    z-index: -10;

    opacity: 30%;
`

export const FormBox = styled.div`
    width: 35vw;

    display: flex;
    flex-direction: column;
    padding: 32px;
    align-items: flex-start;

    border-radius: 16px;
    border: 1px solid var(--azul-2, ${theme.colors.blue.border});
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