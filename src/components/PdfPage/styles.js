import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  width: 100vw;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const MainContent = styled.main`
  width: 100%;
  height: 100%;

  padding: 0 37rem;

  background-color: ${theme.colors.white};
`;

export const GreetingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1.2rem;
`;

export const Title = styled.h1`
  margin-top: 2%;
  font-size: 2.8rem;
`;

export const SubTitle = styled.h2`
  font-size: 2rem;
`;
