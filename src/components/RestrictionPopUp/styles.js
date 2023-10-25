import styled from "styled-components";

export const Container = styled.div`
    height:100vh;
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: start;
    position: absolute;
    top: 0;
    left: 0;
`

export const MainContentContainer = styled.div`
    width: 35vw;
    height: 30vh;
    background-color: #EDF6FF;
    display: flex;
    flex-direction: column;
    z-index: 101;
    border-radius: 20px;
    padding: 20px;
    position: fixed;
    gap: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-left: 6px;
    margin-bottom: 6px;

    @media(max-width: 1026px){
        width: 45vw;
    }
`

export const CloseButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    
    img{
        cursor: pointer;
    }
`

export const MainContent = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    gap: 30px;
`

export const ImageArea = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: start;

    img{
        width: 200px;
    }

    @media(max-width: 1396px){
        img{
            width: 150px;
        }
    }
`

export const InfoContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3vh;
`

export const TitleArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const Border= styled.div`
    border: 2px solid #0660BA;
    width: 17%;
`

export const TextArea = styled.div`
    width: 100%;
    font-size: 14px;
    font-weight: 500;

    @media(max-width: 1236px){
        font-size: 11px;
    }
`

export const ButtonArea = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 10px;
`

export const ButtonTransparent = styled.button`
    background-color: transparent;
    color: #1669BE;
    outline: none;
    border: none;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 500;

    &:hover{
        color: blue;
    }

    @media(max-width: 1236px){
        font-size: 10px;
    }
    
`

export const ButtonRegistration = styled.button`
    background-color: #0660BA;
    border: none;
    color: white;
    padding: 5px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 4px;
    display: flex;
    align-items: stretch;
    gap: 15px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    outline: none;
    font-size: 14px;

    &:hover{
        background-color: #0472e0;
        transition: all .5s;
    }

    @media(max-width: 1236px){
        font-size: 10px;
    }

    @media(max-width: 1106px){
        font-size: 8px;
    }
`
