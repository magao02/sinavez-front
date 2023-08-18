import styled from "styled-components";
import theme from "./theme";
import { Title2 } from "./commonStyles";

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