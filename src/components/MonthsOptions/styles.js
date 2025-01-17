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

    @media (max-width: 1112px){
        font-size:70%;
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
    width: 20%;
    border-radius: 25px;
    font-size: 14px;
    color: ${(props) => props.selected ? "white" : "black"};

    @media (max-width: 1112px){
        font-size: 100%;
        width: 15%;
    }

    @media (max-width: 951px){
        font-size: 8px;
        width: 15%;
    }


    
    cursor: pointer;
    &:hover{
        background-color: #032E58;
        color: white;
    }
`