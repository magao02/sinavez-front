import styled from "styled-components";

export const Steps = styled.div`
    display: flex;
    align-items: center;
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