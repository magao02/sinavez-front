import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #C5DBF2;
    border-radius: 4px;
    padding: 8px;
    gap: 15px;

    span{
        font-size: 100%;
    }
`

export const OptionArea = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    flex: 1;
    gap: 8px;
    width: 80%;
`

export const Option = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.selected ? "#032E58" : "#EDF6FF"};;
    padding: 2px 8px 2px 8px;
    height: 20%;
    width: 20%;
    border-radius: 25px;
    font-size: 14px;
    color: ${(props) => props.selected ? "white" : "black"};
    
    cursor: pointer;
    &:hover{
        background-color: #032E58;
        color: white;
    }
`