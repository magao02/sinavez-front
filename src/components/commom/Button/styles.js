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
        flex-direction: row;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        gap: 0.7vw;

        height: ${props => props.height};
        width: ${props => props.width};

        border-radius: 4px;
        border: none;
        background: var(--azul-0, ${theme.colors.blue.heavy});

        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        
        color: var(--primary-contrast, ${theme.colors.white.default});
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
        
        color: var(--primary-contrast, ${theme.colors.white.default});
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
        
        color: var(--primary-contrast, ${theme.colors.white.default});
        font-size: 18px;
        font-weight: 500;

        &:hover {
          filter: brightness(80%);
        }
      `;
    }

    case "light": {
      return css`
      display: flex;
      padding: 4px 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      border: none;
      border-radius: 4px;
      background: var(--azul-1, ${theme.colors.blue.lighter});

      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
      
      color: var(--text-invertido, ${theme.colors.white.default});
      font-size: 14px;
      font-family: Roboto;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;

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
        color: ${theme.colors.white.default};
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
        color: ${theme.colors.white.default};
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
        color: ${theme.colors.white.default};

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

    case "squared": {
      return css`
        display: flex;
        width: 40px;
        height: 40px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 4px;
        border: ${props => props.blue ? `var(--azul-2, ${theme.colors.blue.shadow})` : `1px solid var(--text-secundary, ${theme.colors.gray.default})`};
        background-color: ${props => props.blue ? `var(--azul-2, ${theme.colors.blue.shadow})` : `1px solid var(--text-secundary, ${theme.colors.white.default})`};
        opacity: ${props => props.disabledButton == true ? `0.3799999952316284` : `1`};
        cursor: ${props => props.disabledButton == true ? `default` : `pointer`};
      `;
    }

    case "white": {
      return css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 12px;

        width: 219px;
        height: 42px;

        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.2);
        border-radius: 4px;

        flex: none;
        order: 1;
        flex-grow: 0;

        border: none;

        background-color: ${theme.colors.white.default};

        &:hover{
            cursor: pointer;
        }
      `
    }

    case "home": {
      return css`
        width: 39vw;
        height: 25vh;
        padding: 34px;
        gap: 36px;

        grid-template-columns: 20% 80%;
        display: grid;

        border: none;

        border-radius: 8px;
        background: var(--azul-0, ${theme.colors.blue.heavy});
        box-shadow: 0px 4px 4px 0px rgba(7, 96, 186, 0.45);
      `
    }

    case "text": {
      return css`
        background: none;
        border: none;

        color: var(--primary-main, ${theme.colors.blue.button});

        font-size: 14px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;

        display: flex; 
        align-items: center;
        gap: 0.5vw;
      `
    }

    case "cancelRemove": {
      return css`
      background: none;
      border: none;

      color: var(--primary-main, ${theme.colors.blue.button});

      font-family: Roboto;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;

      display: flex;
      padding: 8px 11px;
      justify-content: center;
      align-items: center;
      `
    }

    case "remove": {
      return css`
      background: #CB4242 ;
      border: none;

      color: white;

      font-family: Roboto;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      border-radius: 4px;
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20);

      display: flex;
      padding: 12px 25px;
      justify-content: center;
      align-items: center;
      `
    }

    case "buttonBasic": {
      return css`
      background: none;
      border: none;
      outline: none;
      color: #747880;
      border-radius: 4px; 
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; 
      gap:4px;
    `
  }

  case "removeBut": {
    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;

      background: transparent;
      font-family: Roboto;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
    `
    }

    case "editButton": {
      return css`
      display: flex;
      padding: 8px 22px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  
      border-radius: 4px;
      background: #0760BA;
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20);    
      
      
      color: #FDFDFD;
      font-feature-settings: 'clig' off, 'liga' off;

      font-family: Roboto;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: 26px; 
      letter-spacing: 0.46px;
      text-transform: uppercase;
      border: none;
      `
      }

      case "default-sucess": {
        return css`
          display: flex;
          padding: 12px 22px;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          align-self: stretch;
          gap: 0.7vw;
  
          height: ${props => props.height};
          width: ${props => props.width};
  
          border-radius: 4px;
          border: none;
          background: #2E7D32;
  
          box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
          
          color: var(--primary-contrast, ${theme.colors.white.default});
          font-size: 18px;
          font-weight: 500;
  
          &:hover {
            filter: brightness(80%);
          }
        `;
      }

      case "dependente": {
        return css`
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
  
          background: transparent;
  
          text-decoration: none;
          font-size: 1.6rem;
          color:#2196F3;
        `;
      }

      case "dependenteConcluir": {
        return css`
          
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
  
          background: #52B4AD;
          padding: 4px 10px;
          border-radius: 6px;
          width: 100px;
  
          text-decoration: none;
          font-size: 1.6rem;
          color: ${theme.colors.white.default};
          box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        `;
      }
  }
}
