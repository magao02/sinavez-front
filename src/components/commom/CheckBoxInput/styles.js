import styled from "styled-components";
import theme from "../../../styles/theme";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .5vw;
`

export const Label = styled.label`
    display: flex;
    flex-direction: row;
    font-size: medium;
    gap: 10px;
    width: 100%;
    font-size: 13px;
`

export const CheckBox = styled.input.attrs({type:"checkbox"})`
    height: 35px;
    width: 20px;
    cursor: pointer;
`

export const Button = styled.button`
        height: 60%;
        border-radius: 5px;
        padding: 5px;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #EDF6FF;
`
