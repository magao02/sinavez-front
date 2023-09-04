import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
`

export const ModalContent = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap:2vh;
    background-color: white;
    padding: 20px;
    position: fixed;
    z-index: 101;
`

export const Main = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2vw;
`

export const TextAside = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
export const ButtonArea = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
`

export const Button = styled.button`
    background-color: white;
    display: flex;
    align-items: center;
    gap: 1vw;
    color: #2674C2;
    border: none;
    outline: none;
    font-weight: bolder;
`
