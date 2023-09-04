import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid #1F95E9;
    border-radius: 7px;
    display: flex;
    align-items: center;
    flex-direction: row;
`

export const PhotoArea = styled.div`
    width: 35%;
    height: 100%;

    display: flex;

    img{
        width: 100%;
        height: 100%;
        border-radius: 5px 0px 0px 5px;
    }
`
export const Status = styled.div`
    background-color: ${(props) => props.status ? "#42908A" : "#FE730F"};
    border-radius: 0px 10px 10px 0px;
    padding: 10px;
    position: absolute;
    display: flex;
    color: white;
    font-size: 10px;
    font-weight: 400;
    margin-top: 30px;
`

export const InfoArea = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 10px;
`

export const MainInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 65%;
    gap: 10px;
`


export const TitleAndButtonArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`


export const Button = styled.div`
    background-color: #0761BB;
    color: white;
    padding: 7px 10px;
    border-radius: 5px;
    cursor: pointer;
    
    
    &:hover{
        
    }
`


export const SpanArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    color: #8C9099;
    gap: 1vh;
`

export const ItensArea = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    gap: 2vw;
`