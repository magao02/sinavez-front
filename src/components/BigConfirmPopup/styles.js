import styled, { css } from "styled-components";
import theme from "../../styles/theme";
import { Subtitle2 } from "../../styles/commonStyles";

export const BigCenteredPopup = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 9999;
  height: 100%;

  .background {
    position: fixed;
    background: rgba(0, 0, 0, 0.50);
    width: 100vw;
    height: 100vh;
    z-index: -10;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  article {
    display: flex;
    flex-direction: column;
    background: ${theme.colors.white.default};
    border-radius: 4px;

    header {
      padding: 16px 24px;
    }

    section {
      padding: 20px 24px;
      
      display: flex;
      align-items: center;
      gap: 32px;

      & > :not(img) {
        max-width: 450px;
      }
    }

    footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;

      padding: 24px;
    }
  }
`;

export const ColorButton = styled(Subtitle2)`
  display: flex;
  padding: 8px 22px;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  border-radius: 4px;
  background: #2E7D32;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  color: white;

  user-select: none;
  cursor: pointer;

  transition: 0.1s;

  ${props => props.transparent && css`
    background: none;
    color: ${theme.colors.blue.heavy};
    box-shadow: none;
  `}
  ${props => props.cyan && css`
    background: #42908a;
  `}

  &:hover {
    filter: brightness(90%);
  }

  &:active {
    filter: brightness(80%);
  }
`;