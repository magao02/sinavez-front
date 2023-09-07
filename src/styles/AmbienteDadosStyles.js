import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 10vh;
`


export const Header = styled.div`
    height: 10vh;
    width: 100%;
    position:relative;
`

export const RedirectArea = styled.div`
    width: 100%;
    margin-top: 20px;
    margin-bottom: 30px;

    a{
        color: black;
    }

    a:hover{
        text-decoration: underline;
    }
`

export const MainContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3vh;
    width: 60vw;

    @media (max-width: 1629px) {
        width: 70vw;
    }

    @media (max-width: 1513px) {
        width: 75vw;
    }

    @media (max-width: 1417px) {
        width: 80vw;
    }

    @media (max-width: 1329px) {
        width: 85vw;
    }

    @media (max-width: 1245px) {
        width: 90vw;
    }

    @media (max-width: 1169px) {
        width: 95vw;
    }
`

export const AmbientWrapper = styled.div`
    width: 100%;
`

export const TitleArea = styled.div`
    width: 100%;
    display: flex;
    align-items: first baseline;
    justify-content: first baseline;
    color: #3D3F45;
`

export const ReservasArea = styled.div`
    background-color: #EDF6FF;
    width: 100%;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 25px;
`

export const DataArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 10px;
`

export const MonthsArea = styled.div`
    width: 100%;
    height: 40px;
`

export const ReservasContent = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
`

export const ReservasInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`

export const NoReservations = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
`

export const MsgArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
`

export const ButtonReserva = styled.button`
    color: #0660BA;
    padding: 8px 12px 8px 12px;
    background-color: transparent;
    border: 1px solid #0660BA;
    border-radius: 5px;
    font-weight: 600;
`