import styled, { css } from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  ${(props) => getStyleByVariant(props.variant)};
`;

function getStyleByVariant(variant) {
  switch (variant) {
    case "default": {
      return css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        align-self: stretch;
      `;
    }

    case "admin": {
      return css`
        width: 100%;
        height: 80%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `;
    }
  }
}
export const Header = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  gap: 1rem;
`;

export const Title = styled.h1`
  align-self: center;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;

  display: grid;

  align-self: center;
  justify-content: center;

  grid-template-columns: 50% 50%;

  gap: 7.3rem;
  padding: 0 19rem;
`;

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center
  align-items: center;

  gap: 3.4rem;

  span {
    color: ${theme.colors.red};
    text-align: center;
    font-weight: bold;
  }
`;


export const SubTitle = styled.h3`
    color: var(--text-primary, ${theme.colors.gray.menu});

    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: ${props => props.marginTop ? `25px` : `0px`}; 
`
