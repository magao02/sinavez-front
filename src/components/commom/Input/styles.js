import styled from "styled-components";
import theme from "../../../styles/theme";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    label {
        color: ${theme.colors.dark.heavy};
        font-weight: 400;
        padding-bottom: 1.6rem;
    }

`;

export const BaseInput = styled.input`
    padding: 1rem 0 1rem 1.6rem;
    border-radius: 0.7rem;
    border: 1px solid ${theme.colors.dark.heavy};
    width: 100%;

    outline: none;

    &::placeholder {
        color: ${theme.colors.dark.heavy};
        opacity: 0.3;
    }
`;


