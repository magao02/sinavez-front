import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2vh;
`

export const InputContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 3vh;
`

export const CamaInputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
`

export const InputBox = styled.div`
    width: 100%;
    display: flex;
    align-items: start;
    flex-direction: column;
`

export const ErrorMsg = styled.span`
    color: red;
    font-size: 13px;
`

export const CheckBoxInputs = styled.div`
    display: flex;
    flex-direction: row;
    border: none;
    gap: .5vw;
`

export const AddBedButton = styled.button`
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

export const Placeholder = styled.span`
    color: gray;
    margin-top: -50px;
    margin-bottom: 10px;
`