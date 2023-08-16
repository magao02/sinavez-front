import styled from "styled-components";
import theme from "../../../styles/theme";

export const Container = styled.div`
  z-index: 100;

  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 26vh;

  left: 50vw;
  top: 50vh;
  margin-left: -25vw;
  margin-top: -12.5vh;

  background-color: #FFF;
  border-radius: 5px;

  padding: 24px;
`;

export const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 640px;
  padding: 64px;
  background-color: #FFF;
  border-radius: 12px;
`;

export const TextField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 0;
  color: var(--text-primary, ${theme.colors.gray.menu});

  font-size: 22px;
  font-weight: 600;
  line-height: 26pt;
`;

export const ButtonField = styled.div`
  margin-top: 17.5%;

  display: flex;

  align-items: center;
  justify-content: flex-end;
  gap: 20px;
`

export const CancelButton = styled.p`
  color: var(--azul-0, ${theme.colors.blue.heavy});

  font-size: 18px;
  font-family: Roboto;
  font-weight: 500;
  line-height: 22px;
  text-transform: uppercase;

  &:hover{
    cursor: pointer;
  }
`