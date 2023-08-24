import styled from "styled-components";

export const Container = styled.div`
    height:100vh;
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

