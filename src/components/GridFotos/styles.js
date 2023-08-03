import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 2vh;
`

export const FotosContainer = styled.div`
    display: flex;
    width: 100%;
    height: 75%;
`

export const PhotoArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-height: 250px;
    width: ${(prop) => prop.width ? prop.width : "100%"};
    background-color: #ECF6FE;
    border: 1px solid;
    border-color: #D3E3F4;
    border-radius: 10px;
    overflow: hidden;
`

export const PhotoAreaSmaller = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ECF6FE;
    border: 1px solid;
    border-color: #D3E3F4;
    border-radius: 10px;
    height: 110px;
    overflow: hidden;
`

export const PhotoList = styled.div`
    display: grid;
    flex: 1;
    grid-template-columns: repeat(3, 1fr);
    max-height: 250px;
    width: 100%;
    gap: 7px;
`

export const Span = styled.span`
    color: #757881;
    font-size: 1.3vh;
    display: flex;
    align-items: center;
`

export const TextArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
    gap: 1vh;
`