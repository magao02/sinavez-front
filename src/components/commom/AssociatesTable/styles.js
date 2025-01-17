import styled from "styled-components";
import theme from "../../../styles/theme";

export const Table = styled.div`
    display: flex;
    flex-direction: column;

    width: 85vw;

    gap: 1.5vh;
`

export const TableHead = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.gap ? "45%" : "50%"}};
    margin-top: ${props => props.marginTop ? "10px" : "0"};
    padding: ${props => props.padding ? "7px 8px" : "0"};

    width: ${props => props.width ? "1216px" : "100%"};
    
    color: var(--text-primary, ${theme.colors.gray.menu});
    font-size: 18px;
    font-weight: 500;
`

export const TableBody = styled.div`
    color: var(--text-primary, rgba(0, 0, 0, 0.87));

    font-size: 14px;
    font-family: Roboto;
    line-height: 18px;

    width: 100%;

    display: flex;
    flex-direction: column;

    img {
        &:hover {
            cursor: pointer;
        }
    }
`

export const Associate = styled.div`
    position: abolute;
    display: grid;
    grid-template-columns: 3% 7% 15% 75%;
    justify-content: center;
    align-items: start;
    width: 1216px;
    border-bottom: 1px solid var(--divider, rgba(0, 0, 0, 0.12));

    width: 100%;
    height: 8vh;

    padding: 1.5vh;

    background: ${props => props.color == "white" ? `var(--background, ${theme.colors.white.default})` : `var(--background, ${theme.colors.blue.light})`};
`

export const Name = styled.div`
    color: var(--text-primary, rgba(0, 0, 0, 0.87));
    font-size: 16px;
    font-family: Roboto;
    line-height: 18px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const Profession = styled.div`
    color: var(--text-primary, rgba(0, 0, 0, 0.87));

    font-size: 14px;
    font-family: Roboto;
    line-height: 18px;
`

export const Buttons = styled.div`
    display: flex;
    align-items: center;
    margin-left: 1vw;

    gap: 0.25vw;
`

export const TableFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.5vh; 
    margin-bottom: 2vh;
`

export const Text = styled.p`
    color: var(--text-secundary, ${theme.colors.gray.default});

    font-size: 14px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
`

export const ImagemAssociado = styled.div`
    display: flex;
    align-items: center;
    gap: 0.1px;

    img {
        max-width: 40px;
        max-height: 40px;
        border-radius: 50%;
    }
`