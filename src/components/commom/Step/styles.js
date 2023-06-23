import styled from "styled-components";
import theme from "../../../styles/theme";

export const StepBox = styled.div`
    display: flex;
    align-items: center;

    gap: 1vw;
`

export const StepCircle = styled.div`
    width: 24px;
    height: 24px;

    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 10px;

    background-color: ${theme.colors.gray.default};
    color: #FFF;
`