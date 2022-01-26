import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding-top: 5.2rem;
    

    label {
        padding-bottom: 4.2rem;

        opacity: 0.3;
    }
`;

export const BaseInput = styled.input`
    background: transparent;
    border-style: solid;
    border-width: 0 0 1px 0;
    border-color: hsl(360, 8, 5);
    outline: none;
    
    padding: 0 0.2rem 0.2rem 0.2rem;
`;
