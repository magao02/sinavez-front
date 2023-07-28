import styled from "styled-components";
import theme from "./theme";

export const NavSpacing = styled.div`
  height: 8.3vh; // copied from the Navigation's height
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 30px;
  @media(min-width: 1400px) {
    padding: 0 10vw;
  }
`;
