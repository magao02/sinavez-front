import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 1vw;
`

export const CheckArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-right: ${(prop) => prop.border == "none" ? "none" : "2px solid"};
    border-color: ${theme.colors.blue.heavy};
`