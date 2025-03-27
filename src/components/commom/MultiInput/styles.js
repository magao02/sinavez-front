import styled from "styled-components";

export const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 2.4rem;
`;

export const InputsContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 30% calc(70% - 1.2rem);

    gap: 1.2rem;

`;

export const CheckBox = styled.label`
    width: 100%;
    font-size: 1.6rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
    padding-right: 1.2rem;


    input {
        width: 2.7rem;;
        height: 2.7rem;
        background: blue;
    }

`;