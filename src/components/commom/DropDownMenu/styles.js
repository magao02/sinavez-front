import styled from "styled-components";
import theme from "../../../styles/theme";

export const MenuBox = styled.div`
    width: 257px;
    height: 48px;

    cursor: pointer;

    border-radius: 8px;
    background-color: ${theme.colors.white.default};
    border-top: 1px solid var(--azul-2, ${theme.colors.blue.shadow});
    box-shadow: 0px 4px 4px 0px ${theme.colors.blue.shadow};

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 30px; 

    color: var(--text-primary, ${theme.colors.gray.menu});
    font-size: 18px;
    font-family: Roboto;
    line-height: 22px;
`

export const OpenedMenuBox = styled.div`
    position: absolute;

    background-color: ${theme.colors.white.default};
    display: flex;
    width: 257px;
    height: 90px;
    padding: 10px 8px 8px 32px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-top: -7px;
    gap: 20px;
    flex-shrink: 0;

    border-radius: 0px 0px 8px 8px;
    box-shadow: 0px 4px 0px 0px ${theme.colors.blue.shadow};
`

export const Menu = styled.div`
    position: absolute;
`

export const Option = styled.div`
    cursor: pointer;
    width: 100%;

    display: flex;
    color: var(--text-secundary, ${theme.colors.gray.default});
    font-size: 18px;
    font-family: Roboto;
    line-height: 22px;

    gap:10px;
`