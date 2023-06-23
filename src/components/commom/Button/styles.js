import styled, { css } from "styled-components";

import theme from "../../../styles/theme";

export const Container = styled.button`
  ${(props) => getStyleByVariant(props.variant)};
`;

function getStyleByVariant(variant) {
  switch (variant) {
    case "default": {
      return css`
        display: flex;
        padding: 12px 22px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-self: stretch;

        border-radius: 4px;
        border: none;
        background: var(--azul-0, ${theme.colors.blue.heavy});

        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        
        color: var(--primary-contrast, ${theme.colors.white});
        font-size: 18px;
        font-weight: 500;

        &:hover {
          filter: brightness(80%);
        }
      `;
    }

    case "default-adjustable-15%": {
      return css`
        display: flex;
        padding: 12px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-self: stretch;

        width: 15%;

        border-radius: 4px;
        border: none;
        background: var(--azul-0, ${theme.colors.blue.heavy});

        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        
        color: var(--primary-contrast, ${theme.colors.white});
        font-size: 18px;
        font-weight: 500;

        &:hover {
          filter: brightness(80%);
        }
      `;
    }

    case "default-adjustable-30%": {
      return css`
        display: flex;
        padding: 8px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-self: stretch;

        width: 30%;

        border-radius: 4px;
        border: none;
        background: var(--azul-0, ${theme.colors.blue.heavy});

        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        
        color: var(--primary-contrast, ${theme.colors.white});
        font-size: 18px;
        font-weight: 500;

        &:hover {
          filter: brightness(80%);
        }
      `;
    }

    case "signup": {
      return css`
        width: 100%;
        border: none;
        border-radius: 2.4rem;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 1.2rem;

        margin-top: 1rem;

        font-size: 1.4rem;
        color: ${theme.colors.white};
        background-color: ${theme.colors.blue.default};
        font-weight: bold;

        &:hover {
          filter: brightness(80%);
        }
      `;
    }

    case "password": {
      return css`
        width: 100%;
        border: none;
        border-radius: 2.4rem;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 1.2rem;

        margin-top: 5.6rem;
        margin-bottom: 2.4rem;

        font-size: 1.4rem;
        color: ${theme.colors.white};
        background-color: ${theme.colors.red};

        &:hover {
          filter: brightness(80%);
        }
      `;
    }
    case "image": {
      return css`
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;

        background: transparent;
      `;
    }
    case "nav": {
      return css`
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;

        background: transparent;

        text-decoration: none;
        font-size: 1.6rem;
        font-weight: bold;
        color: ${theme.colors.white};

        text-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
      `;
    }
    case "associado": {
      return css`
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;

        background: transparent;

        text-decoration: none;
        font-size: 1.6rem;
        font-weight: bold;
        color: ${theme.colors.red};
      `;
    }
    case "close": {
      return css`
        position: absolute;
        background: transparent;
        border: none;
        font-size: 2rem;
        top: 10rem;
        right: 5rem;
      `;
    }

    case "year": {
      return css`
        background: transparent;
        border: solid 1px black;
        border-radius: 12px;
        padding: 10px 20%;
        margin-top: 10px;
      `;
    }

    case "create-year": {
      return css`
        background: transparent;
        border: solid 1px black;
        border-radius: 12px;
        padding: 10px 10px;
        margin: 20px 20px 5px 10px;
      `;
    }
  }
}
