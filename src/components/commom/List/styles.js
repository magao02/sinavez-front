import styled, {css} from "styled-components";

export const Container = styled.div`
  ${(props) => getStyleByVariant(props.variant)};
`;

function getStyleByVariant(variant) {
  switch (variant) {
    case "associados": {
      return css`
        width: 100%;
        height: 7%;

        display: grid;
        grid-template-columns: 35% 30% 7.5% 7.5% 5% 5% 5% 5%;
        justify-content: center;
        align-items: center;

        border: 1px solid black;
        border-radius: 0.7rem;

        padding: 0.2rem 2.2rem;

        p {
          font-weight: bold;
        }
      `;
    }
    case "dependente": {
      return css`
        width: 100%;
        height: 7%;

        display: grid;
        grid-template-columns: 5% 30% 15% 20% 15% 10% 5%;
        justify-content: center;
        align-items: center;

        border: 1px solid black;
        border-radius: 0.7rem;

        p {
          font-weight: bold;
        }
      `;
    }
  }
}
