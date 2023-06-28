import styled from "styled-components";
import theme from "../../../styles/theme";

export const Text = styled.p`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 150px;
    height: 7.5vh;

        text-decoration: none;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
    
        text-decoration: none;
        color: ${theme.colors.gray.default};
`

export const LinkBoxStyle = styled.p`
    width: 150px;
    height: 7.5vh;

    cursor: pointer;
`

export const LinkBoxStyleSelected = styled.p`
    width: 150px;
    height: 7.5vh;

    cursor: pointer;

    border-radius: 8px 8px 0px 0px;
    background-color: ${theme.colors.blue.light};
`

export const TextSelected = styled.p`
    width: 150px;
    height: 7.5vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

        text-decoration: none;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
    
        text-align: center;
    
        color: ${theme.colors.blue.heavy};
`

export const LinkBoxDetailSelected = styled.div`
    width: 100%;
    height: 4px;

    background: ${theme.colors.blue.heavy};
    border-radius: 4px 4px 0px 0px;
`