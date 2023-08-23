import styled, { css } from "styled-components";
import theme from "./theme";
import { Body3, Subtitle2, Title2 } from "./commonStyles";

export const Container = styled.div`
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

  margin-bottom: 50px;
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

    flex: 1;

    & > img {
      width: 177px;
      height: 177px;
      border-radius: 177px;
    }

    ${props => props.blue ? css`
      background: ${theme.colors.blue.shadow};
      border: none;
    ` : ''}
  }

  .dependentes {
    justify-content: space-between;
  }

  .align-right {
    align-self: flex-end;
  }
`;

export const Dados = styled.div`
  display: flex;
  flex-direction: column;
  ${props => props.fill ? css`
    padding: 0 16px;
    width: 100%;
  ` : css`
    
  `}
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export const Tabs = styled.div`
  display: flex;
  width: 100%;
`;

export const Tab = styled(Subtitle2)`
  --color: ${props => props.selected ? theme.colors.blue.heavy : theme.colors.blue.lighter};
  border-bottom: 2px solid var(--color);

  color: var(--color) !important;
  
  padding: 9px 0;
  flex: 1;
  text-align: center;
  user-select: none;

  transition: 0.1s;

  &:hover {
    cursor: pointer;
    --color: #0f59a3;
  }

  text-transform: uppercase;
`;

export const DadosButton = styled(Body3)`
  padding: 8px;

  --color: ${theme.colors.blue.heavy};
  border-radius: 4px;
  border: 1px solid var(--color);

  background: none;

  color: var(--color);
  font-weight: 500;
  text-transform: uppercase;

  user-select: none;
  cursor: pointer;

  transition: background 0.1s;

  &:hover {
    background: #f0f0f0;
  }

  margin-top: 24px;
`;

export const DadosPopup = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 9999;

  .background {
    position: fixed;
    background: rgba(0, 0, 0, 0.50);
    width: 100vw;
    height: 100vh;
    z-index: -10;
  }

  .modal {
    display: flex;
    flex-direction: column;
    margin: 100px 60px;
    @media(min-width: 1400px) {
      margin: 100px 15vw;
    }

    background: ${theme.colors.white.default};

    & > header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;

      border-bottom: 1px solid ${theme.colors.blue.background};

      & > img {
        cursor: pointer;
        user-select: none;
      }
    }

    & > article {
      padding: 32px;

      display: flex;
      flex-direction: column;

      & > header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 42px;

        .perfil {
          display: flex;
          gap: 30px;

          img {
            width: 140px;
            height: 140px;
            border-radius: 140px;
          }
        }
      }

      .columns {
        display: flex;
        gap: 64px;

        .column {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: space-between;

          gap: 16px;
        }
      }

      .confirm-buttons {
        align-self: center;
        padding-top: 32px;
        display: flex;
        gap: 24px;

        .cancel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;

          color: ${theme.colors.gray.default};

          font-family: Roboto;
          font-size: 16px;
          font-weight: 500;
          text-transform: uppercase;

          user-select: none;
          cursor: pointer;
        }
      }
    }
  }
`;

export const Dependentes = styled.div`
  width: 100%;
`;

export const DependenteCell = styled.div`
  background: ${theme.colors.white.default};

  &:nth-of-type(even) {
    background: ${theme.colors.blue.light};
  }

  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  padding: 10px 8px;
  width: 100%;

  display: flex;
  align-items: center;

  --color: rgba(0, 0, 0, 0.87);

  .nome {
    flex: 4;
    color: var(--color);
  }

  .parentesco {
    flex: 3;
    color: var(--color);
  }

  .icons {
    display: flex;
    gap: 8px;

    & img {
      cursor: pointer;

      &:hover {
        filter: invert(50%);
      }
    }
  }
`;

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
  background: var(--success-main, #2E7D32);
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

export const DependentePopup = styled(DadosPopup)`
  display: flex;
  justify-content: center;

  .buttons {
    display: flex;
    justify-content: center;
    padding-top: 16px;
  }
`;

export const DependenteFormModal = styled.div`
  border-radius: 4px;
  border: 1px dashed ${theme.colors.blue.shadow};
  background: ${theme.colors.blue.light};

  width: 500px;

  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;