import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 3px;
    display: flex;
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
        }
`

export const ReservarButton = styled.button`
    background-color: #0761BB;
    flex: 1;
    border: none;
    color: white;
    border-radius: 3px;
    font-size: 14px;
    padding: 5px;
    font-weight: bold;
    cursor: pointer;
`