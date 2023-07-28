import styled from "styled-components";
import theme from "./theme";

export const NavSpacing = styled.div`
  height: 8.3vh; // copied from the Navigation's height
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  @media(min-width: 1400px) {
    padding: 0 10vw;
  }
  margin-top: 100px;
`;

export const Title1 = styled.h1`
  color: ${theme.colors.gray.menu};

  font-family: Jost;
  font-size: 32px;
  font-weight: 700;
`;

export const Title2 = styled.h2`
  color: ${theme.colors.gray.menu};

  font-family: Jost;
  font-size: 24px;
  font-weight: 600;
`;

export const Subtitle1 = styled.h3`
  color: ${theme.colors.gray.menu};

  font-family: Jost;
  font-size: 22px;
  font-weight: 600;
`;

export const Subtitle2 = styled.h4`
  color: ${theme.colors.gray.menu};

  font-family: Jost;
  font-size: 18px;
  font-weight: 500;
`;

export const Body1 = styled.span`
  color: ${theme.colors.gray.default};

  font-family: Roboto;
  font-size: 18px;
  font-weight: 400;
`;

export const Body2 = styled.span`
  color: ${theme.colors.gray.default};

  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
`;

export const Body3 = styled.span`
  color: ${theme.colors.gray.default};

  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
`;

export const Images = styled.div`
`;

export const Details = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 32px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const BlueOutlineCard = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  gap: 10px;

  border-radius: 8px;
  border: 1px solid ${theme.colors.blue.lighter};
  background: ${theme.colors.white.default};
`;

export const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 6px;
  max-width: 802px;
`;

export const FeatureCard = styled.div`
  display: flex;
  padding: 4px 16px;
  align-items: flex-start;
  gap: 13px;
  align-items: center;
  border-radius: 8px;
  background: ${theme.colors.blue.light};

  flex: none;
  /* width: calc(33% - 3px); */
  width: 247px;
`;