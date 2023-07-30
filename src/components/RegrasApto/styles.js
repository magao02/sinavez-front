import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1vh;
`


export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    gap: 1vw;
`

export const EditButton = styled.div`
    background-color: #edf7fe;
    padding: 2px 5px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
`
export const DeleteButton = styled.button`
    height: 80%;
    border-radius: 5px;
    padding: 5px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #EDF6FF;
`

export const RegrasArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1vh;
`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1vw;
`

export const AddButton = styled.button`
    display: flex;
    padding: 4px 10px;
    width: 10vw;
    flex-direction: row;
    justify-content: center;
    gap: 2px;
    align-items: center;

      border: none;
      border-radius: 4px;
      background: var(--azul-1, ${theme.colors.blue.heavy});

      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
      
      color: var(--text-invertido, ${theme.colors.white.default});
      font-size: 14px;
      font-family: Roboto;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;

      &:hover {
        filter: brightness(80%);
      }
`