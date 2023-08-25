import styled, { css } from "styled-components";
import CalendarIcon from "../../assets/calendar_icon.svg";
import ArrowDropdownFilled from "../../assets/arrow_dropdown_filled.svg";
import theme from "../../styles/theme";

const commonStyle = css`
    outline: none;
    border: none;
    border-bottom: 2px solid #999;
    background-color: #EDF6FF;

    padding: 0.7em 0.65em;
    border-radius: 0.2em 0.2em 0 0;

    &:hover {
        background-color: #f5f8fc;
    }

    &:focus-visible {
        background-color: #FAFBFF;
    }
`;

export const Label = styled.label`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    & > .container {
        ${commonStyle}
        padding-bottom: 0.4em;
        cursor: pointer;

        & > .innerLabel {
            user-select: none;
        }

        & > input {
            width: 100%;
        }

        ${props => props.variant === "light-blue" ? css`
        background: ${theme.colors.white.default};
        border-bottom: 1px solid ${theme.colors.blue.background};
        ` : ''}
    }
`;

export const Input = styled.input`
    -webkit-appearance: none;
    appearance: none;
    border: none;
    background-color: transparent;

    cursor: pointer;

    &::-webkit-inner-spin-button,
    &::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
    }

    &:focus-within {
        outline: none;
    }

    &[type="date"], &[type="time"] {
        background-image: url(${CalendarIcon.src});
        background-repeat: no-repeat;
        background-position: calc(100% - 10px) 50%;
        min-width: max(150px, 10vw);
    }
`;

export const Select = styled.select`
    ${commonStyle}

    /* padding: 1em 0.5em; */
    color: ${theme.colors.gray.menu};

    cursor: pointer;
    appearance: none;

    background-image: url(${ArrowDropdownFilled.src});
    background-repeat: no-repeat;
    background-position: calc(100% - 10px) 50%;

    ${props => props.variant === "light-shadow" ? css`
    background-color: ${theme.colors.white.default};
    border-bottom: none;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.20), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    ` : ''}
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

export const RangeInput = styled.input`
    appearance: revert;
    width: 100%;
    accent-color: ${theme.colors.blue.heavy};
    cursor: pointer;
`;

export const RangeValues = styled.div`
    display: flex;
    justify-content: space-between;
    user-select: none;
`;

export const SliderTooltipContainer = styled.div`
    width: calc(100% - 16px);
    position: relative;
    display: flex;
    align-self: center;
`;

export const SliderTooltip = styled.div`
    position: relative;
    left: ${props => props.percent};
    transform: translateX(-50%);
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    background: ${theme.colors.gray.default};
    color: white;
    padding: 4px 0;
    width: 32px;
    border-radius: 4px;
    margin-bottom: 4px;

    user-select: none;
`;