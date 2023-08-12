import styled from "styled-components";
import theme from './theme';


export const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Main = styled.div`
    flex: 1;
    width: 60vw;
    display: flex;
    flex-direction: column;
    gap: 1vh;
    margin-bottom: 20px;

    @media (max-width: 1379px) {
        width: 80vw;
    }
`
export const Header = styled.div`
    height: 10vh;
    width: 100%;
    position:relative;
`

export const FotosArea = styled.div`
    width: 100%;
    height: 40vh;
    display: flex;
    flex-direction: column;
    gap: 2vh;
`

export const RedirectArea = styled.div`
    width: 70%;
    margin-top: 20px;
    margin-bottom: 30px;
`

export const InfoApto = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1vw;
`

export const LeftSide = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap:2vh;

`

export const RightSide = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2vh;
`

export const ButtonArea = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
`

export const BusyButton = styled.button`
    background-color: #FF720F;
    border: none;
    color: white;
    border-radius: 5px;
    font-weight: 400;
    width: 48%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

export const ReservarButton = styled.button`
    background-color: #0661BA;
    padding: 10px;
    padding-left: 40px;
    padding-right: 40px;
    border: none;
    color: white;
    border-radius: 5px;
    font-weight: 400;
    width: 48%;
    margin-left: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const InfoBox = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    padding: 2% 5%;
    @media (max-height: 720px) {
        padding: 5vh;
    }
    align-items: flex-start;
    gap: 3vh;

    border-radius: 16px;
    border: 1px solid var(--azul-2, ${theme.colors.blue.border});
    background: var(--azul-3, ${theme.colors.blue.light});
`


export const CautionBox = styled.div`
    width: 100%;
    background-color: #C4DAF2;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 3px;
    gap: 2vh;
    box-shadow: rgba(0, 0, 0, 0.60) 0px 5px 15px;
`
