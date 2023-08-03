import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    overflow: hidden;
`

export const Input = styled.input.attrs({type:"file"})`
    display: none;
`
export const Label = styled.label`
    cursor: pointer;

    &:hover{
        transform: scale(1.1);
    }
`

export const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Img = styled.img`
    display: block;
    height: 100%;
    width: 100%;
    border-radius: 10px;
`