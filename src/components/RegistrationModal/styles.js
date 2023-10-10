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

export const MainContent = styled.div`
    width: 40vw;
    height: 80vh;
    background-color: #EDF6FF;
    display: flex;
    flex-direction: column;
    z-index: 101;
    border-radius: 20px;
    padding: 20px;
`

export const CloseButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
`

export const TitleArea = styled.div`
    width: 100%;
    
    h1{
        color: #3D3F45;
    }
`