import styled from "styled-components";
import theme from "../../styles/theme"


export const Container = styled.div`
    height:100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
`

export const MainContentContainer = styled.div`
    width: 550px;
    background-color: #EDF6FF;
    display: flex;
    flex-direction: column;
    z-index: 110;
    border-radius: 20px;
    padding: 40px;
    position: fixed;
    overflow-y: hidden;
    gap: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

export const TitleArea = styled.div`
    width: 100%;
    color: #0660BA;
`

export const Steps = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const StepDivider = styled.span`
    border-bottom: 1px solid gray;
    flex-grow: 1;
    margin: 0 10px;
`;

export const StepColor = styled.span`
    color: ${props => props.active ? "var(--azul-1, #043F79)" : "var(--text-secundary, #747880)"};
    font-size: 14px;
    font-weight: 600;
`;

export const StepNumber = styled.span`
    background: ${props => props.active ? "var(--azul-2, #032E58)" : "var(--text-primary, #3D3F45)"};
    
    width: 1em;
    height: 1em;
    border-radius: 100px;
    padding: 8px;
    font-size: 11px;
    
    color: #faffff;
    
    display: inline-flex;
    align-items: center;
    justify-items: center;
    justify-content: center;

    user-select: none;

    margin-right: 2px;
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const ButtonContainer = styled.div`
    width: 100%;
    display: inline-flex;
    align-items: center;
    gap: 10px;
`