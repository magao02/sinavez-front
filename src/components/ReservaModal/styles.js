import styled from "styled-components";


// PARTE REDUZIDA
export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 150px;
    border: 1px solid #C5DBF2;
    background-color: #FAFBFF;
    border-radius: 5px;
    padding: 20px;
    gap: 10px;
`

export const FotoArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    height: 100%;
`

export const FotoBox = styled.div`
    height: 40%;
    width: 60%;
    background-color: blue;
    height: 90%;
    border-radius: 50%;
`

export const InfoArea = styled.div`
    width: 65%;
    height: 88%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const PersonInfoArea = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 8px;


    p{
        color: #838890;
        font-size: 15px;
    }
`

export const ReservaInfoArea = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
`

export const PagamentoArea = styled.div`
    display: flex;
    flex-direction: column;
    height: 88%;
    width: 20%;
    align-items: end;
    justify-content: space-between;
`

export const PagamentoInfo = styled.div`
    display: flex;
    background-color: ${(props) => props.color};
    color: white;
    padding: 8px 15px 8px 15px;
    font-size: 13px;
    border-radius: 25px 0px 0px 25px;
    margin-right: -20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

export const Button = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: end;
    width: 100%;
    background-color: transparent;
    color: #0861BB;
    border: none;
    gap: 10px;
    font-weight: bold;
    font-size: 12px;
    cursor: pointer;
`

// PARTE GRANDE
export const DataContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 600px;
    border: 1px solid #C5DBF2;
    background-color: #FAFBFF;
    border-radius: 5px;
    gap: 10px;
`

export const DataMainContent = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 150px;
    background-color: #FAFBFF;
    border-radius: 5px;
    padding: 20px;
    gap: 10px;
`

export const Border = styled.div`
    width: 96.5%;
    border: 1px solid #C5DBF2;
`

export const DataDiv = styled.div`
    padding: 20px;
    width: 100%;
`

export const DataMainInfo = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 150px;
    border: 1px solid #C5DBF2;
    background-color: #FAFBFF;
    border-radius: 5px;
    padding: 20px;
    gap: 10px;
`

export const GeralDataContainer = styled.div`
    width: 33%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: ${ (props) => props.border == "none" ? "none" : "1px solid #5D9BDA"};
    gap: 30px;
`

export const DataRowContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
`


export const DataCollumContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const DataTitleArea = styled.div`
    width: 100%;
    font-weight: bold;
`

export const DataSecondArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    flex: 1;
    gap: 15px;
    color: #838890;
    font-size: .9em;
`

export const DataContentWrapper = styled.div`
    display: flex;
    align-items: start;
    gap: 4px;
`