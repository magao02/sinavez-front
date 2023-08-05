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

export const PhotoArea = styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
    height: 100%;
`

export const EditButton = styled.button`
    background-color: #edf7fe;
    padding: 1px 2px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    position: absolute;
    margin-right: 5px;
    margin-top: 5px;
`