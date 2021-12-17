import styled from "styled-components";
import theme from "../../../styles/theme";

export const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    label {
        font-weight: bold;
        padding-bottom: 1.6rem;
    }

    label::after {
        content: '*';
        color: ${theme.colors.red};
    }

    select {
        padding: 1rem 0 1rem 1.6rem;
        border-radius: 0.7rem;
        border: 1px solid ${theme.colors.dark.heavy};
        width: 100%;
        outline: none;

        &::placeholder {
            color: ${theme.colors.dark.heavy};
            opacity: 0.3;
        }
    }
`;
