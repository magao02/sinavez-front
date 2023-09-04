import styled from "styled-components";
import theme from "../../../styles/theme";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-right: ${(prop) => prop.border == "none" ? "none" : "1.5px solid"};
    border-color: ${theme.colors.blue.heavy};
    gap: 0.5vh;
`

export const CheckBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .7vw;
    margin-left: .7vw;
    margin-right: .5vw;
`

export const Input = styled.input.attrs({type: "radio"})`
    width: 13px;
    height: 15px;
`

export const CheckBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-left: 0px;
`
export const Label = styled.label`
    font-size: 15px;
`

export const Span = styled.span`
    color: ${(props) => props.red ? theme.colors.red : ""};
    font-size: "0.9vw";
`