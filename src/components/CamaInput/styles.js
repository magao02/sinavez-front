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
    background-color: #C6CAD0;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
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
