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
    gap: .7vh;
    width: 50%;
    margin-left: 7px;
    margin-right: 10px;
`
export const Input = styled.input.attrs({type: "radio"})`
    width: 15px;
    height: 15px;
`

export const CheckBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
    margin-left: 0px;
`
export const Label = styled.label`
    font-size: 15px;
`