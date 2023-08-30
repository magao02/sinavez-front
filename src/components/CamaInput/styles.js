import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3vh;
`

export const DeleteBedButton = styled.button`
    height: 100%;
    border-radius: 5px;
    padding: 5px;
    background-color: #EDF7FE;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

    &:hover {
        background-color: #C6CAD0;
    }
`

export const InputBox = styled.div`
    width: 100%;
    display: flex;
    align-items: start;
    flex-direction: column;
`

export const ErrorMsg = styled.span`
    color: red;
    font-size: 13px;
`

export const Select = styled.select`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    gap: 0.5vh;
    margin-top: 1vh;
    margin-bottom: 1vh;
    border: none;
    border-bottom: 1px solid;
    outline: none;
    background: none;
    padding: 5px;
`
