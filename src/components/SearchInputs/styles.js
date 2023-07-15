import styled, { css } from "styled-components";

export const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-weight: 600;
    color: #4f4f4f;
    flex-grow: 1;
`;

const commonStyle = css`
    outline: none;
    border: none;
    border-bottom: 2px solid #999;
    background: #EDF6FF;

    padding: 0.65em 0.4em;
    border-radius: 0.2em 0.2em 0 0;

    &:hover {
        background: #f5f8fc;
    }

    &:focus-visible {
        background: #FAFBFF;
    }
`;

export const Input = styled.input`
    ${commonStyle}
    
    cursor: pointer;
`;

export const CounterInputContainer = styled.div`
    ${commonStyle};
    border: none;

    padding: 0.2em 0.4em;
    border-radius: 0.2em;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    user-select: none;
`;

export const CounterInputButton = styled.span`
    display: contents;
    cursor: pointer;
`;