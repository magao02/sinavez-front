import styled from "styled-components";
import theme from "../../../styles/theme";

export const Container = styled.div`
  width: 20%;

  display: flex;
  width: 26vw;
  height: 44px;
  
  align-items: center;
  gap: 0.5vw;
  border-radius: 8px;
  border: 1px solid var(--azul-0, ${theme.colors.blue.heavy});
  background: var(--background, ${theme.colors.white.default});
  padding: 0.95rem;
  min-width: 360px;

  input {
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: var(--text-secundary, ${theme.colors.gray.default});
    font-size: 18px;
    font-family: Roboto;
    line-height: 22px;
    border: none;
    background-color: transparent;
    outline: none;
    padding: 0;
  }
`;
