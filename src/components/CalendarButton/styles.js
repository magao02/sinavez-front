import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    height: 100%;
    gap: 10px;
`

export const CalendarContainer = styled.div`
    width: 50%;
    height: 100%;
    border-radius: 10px;
    padding: 3px;
    display: flex;
    border: 2px solid #0661BA;
`

export const CalendarWrapper = styled.div`
        display: flex;
        flex-direction: column;
        align-self: flex-end;
        width: 100%;
        height: 90%;
        border: none;
        gap: 2px;
        

        p{
            font-size: 12px;
            font-weight: bold;
            color: #757980;
        }

        .flatpickr-input{
            width: 100%;
            height: 100%;
            border: none;
            font-size: calc(100% - 20%);
            outline: none;
            color: black;
            background-color: white;
        }
`

export const ButtonArea = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`


export const ReservarButton = styled.button`
    background-color: #0761BB;
    width: 50%;
    border: none;
    color: white;
    border-radius: 5px;
    font-size: 14px;
    padding: 5px;
    font-weight: bold;
    cursor: pointer;
    height: 100%;
`

export const BusyButton = styled.button`
    background-color: #FF720F;
    border: none;
    color: white;
    border-radius: 5px;
    font-weight: 400;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 100%;
`

export const AvailableButton = styled.button`
    background-color: #43918A;
    border: none;
    color: white;
    border-radius: 5px;
    font-weight: 400;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 100%;
`