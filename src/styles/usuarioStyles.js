import styled, { css } from "styled-components";
import theme from "./theme";
import { Body3, Subtitle2, Title2 } from "./commonStyles";

export const Container = styled.div`
  /* width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.white.default}; */

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentContainer = styled.div`
  margin-top: 8.3vh; // copied from the Navigation's height
  width: 100%;

  padding: 0 30px;
  @media(min-width: 1400px) {
    padding: 0 10vw;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;

  width: 100%;

  // temporary
  margin-top: 100px;
  margin-bottom: 50px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  & > ${Title2} {
    margin-bottom: 16px;
  }

  .card {
    padding: 24px;
    border: 1px solid ${theme.colors.blue.background};
    background: ${theme.colors.white.default};
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    flex: 1;

    & > img {
      width: 177px;
      height: 177px;
      border-radius: 177px;
    }

    ${props => props.blue ? css`
      background: ${theme.colors.blue.shadow};
      border: none;
    ` : ''}
  }
`;

export const Dados = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export const Tabs = styled.div`
  display: flex;
  width: 100%;
`;

export const Tab = styled(Subtitle2)`
  --color: ${props => props.selected ? theme.colors.blue.heavy : theme.colors.blue.lighter};
  border-bottom: 2px solid var(--color);

  color: var(--color) !important;
  
  padding: 9px 0;
  flex: 1;
  text-align: center;
  user-select: none;

  transition: 0.1s;

  &:hover {
    cursor: pointer;
    --color: #0f59a3;
  }

  text-transform: uppercase;
`;

export const DadosButton = styled(Body3)`
  padding: 8px;

  --color: ${theme.colors.blue.heavy};
  border-radius: 4px;
  border: 1px solid var(--color);

  background: none;

  color: var(--color);
  font-weight: 500;
  text-transform: uppercase;

  user-select: none;
  cursor: pointer;

  transition: background 0.1s;

  &:hover {
    background: #f0f0f0;
  }

  margin-top: 24px;
`;