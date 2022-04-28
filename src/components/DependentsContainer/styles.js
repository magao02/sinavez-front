import styled, { css } from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  ${(props) => getStyleByVariant(props.variant)};
`;

function getStyleByVariant(variant) {
  switch (variant) {
    case "default": {
      return css`
        width: 80%;
        height: 80%;

        display: grid;

        flex-direction: column;
        align-items: start;

        margin: 1.9rem 13.9rem;

        background-color: black;

        border: 1px solid black;
        border-radius: 2.4rem;
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

export const SubTitle = styled.h2`
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
