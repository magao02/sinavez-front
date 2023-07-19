import styled, { css } from "styled-components";
import CalendarIcon from "../../assets/calendar_icon.svg";
import ArrowDropdownFilled from "../../assets/arrow_dropdown_filled.svg";

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
    background-color: #EDF6FF;

    padding: 0.65em 0.4em;
    border-radius: 0.2em 0.2em 0 0;

    &:hover {
        background-color: #f5f8fc;
    }

    &:focus-visible {
        background-color: #FAFBFF;
    }
`;

export const Input = styled.input`
    ${commonStyle}
    
    cursor: pointer;

    -webkit-appearance: none;
    appearance: none;

    &::-webkit-inner-spin-button,
    &::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
    }

    &[type="date"] {
        background-image: url(${CalendarIcon.src});
        background-repeat: no-repeat;
        background-position: calc(100% - 10px) 50%;
    }
`;

export const Select = styled.select`
    ${commonStyle}

    /* padding: 1em 0.5em; */

    cursor: pointer;
    appearance: none;

    background-image: url(${ArrowDropdownFilled.src});
    background-repeat: no-repeat;
    background-position: calc(100% - 10px) 50%;
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