import styled, { keyframes } from "styled-components";
import theme from "./theme";


function getTitleColor(props) {
  if (props.blue)
    return theme.colors.blue.border;
  if (props.red)
    return theme.colors.red;
  return theme.colors.gray.menu;
}

function getBodyColor(props) {
  if (props.primary)
    return getTitleColor(props);
  if (props.strong)
    return '#222';
  if (props.blue)
    return theme.colors.blue.border;
  if (props.red)
    return theme.colors.red;
  return theme.colors.gray.default;
}

// defines common typography components based on the style guide.

export const Title1 = styled.h1`
  color: ${getTitleColor};

  font-family: Jost;
  font-size: 32px;
  font-weight: 700;
`;

export const Title2 = styled.h2`
  color: ${getTitleColor};

  font-family: Jost;
  font-size: 24px;
  font-weight: 600;
`;

export const Subtitle1 = styled.h3`
  color: ${getTitleColor};

  font-family: Jost;
  font-size: 22px;
  font-weight: 600;
`;

export const Subtitle2 = styled.h4`
  color: ${getTitleColor};

  font-family: Jost;
  font-size: 18px;
  font-weight: 500;
`;

export const Body1 = styled.span`
  color: ${getBodyColor};

  font-family: Roboto;
  font-size: 18px;
  font-weight: 400;
`;

export const Body2 = styled.span`
  color: ${getBodyColor};

  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
`;

export const Body3 = styled.span`
  color: ${getBodyColor};

  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
`;