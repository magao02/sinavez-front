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

export const MainContentContainer = styled.div`
    width: 700px;
    height: 750px;
    background-color: #EDF6FF;
    display: flex;
    flex-direction: column;
    z-index: 101;
    border-radius: 20px;
    padding: 40px;
    position: fixed;
    gap: 10px;
`

export const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding-left: 50px;
    padding-right: 50px;

`

export const CloseButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    
    img{
        cursor: pointer;
    }
`

export const TitleArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    h1{
        color: #3D3F45;
    }
`

export const Border= styled.div`
    border: 3px solid #0660BA;
    width: 17%;
`

export const TextArea = styled.div`
    width: 100%;
`

export const ImageArea = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        height: 80%;
    }
`

export const ButtonArea = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: -40px;
`

export const ButtonTransparent = styled.button`
    background-color: transparent;
    color: #1669BE;
    outline: none;
    padding: 15px;
    border: none;
    text-transform: uppercase;

    &:hover{
        color: blue;
    }
`

export const ButtonRegistration = styled.button`
    background-color: #0660BA;
    border: none;
    color: white;
    padding: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 4px;
    display: flex;
    align-items: stretch;
    gap: 15px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    outline: none;

    &:hover{
        background-color: #0472e0;
        transition: all .5s;
    }
`