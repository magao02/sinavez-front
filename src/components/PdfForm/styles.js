import styled from 'styled-components';
import theme from '../../styles/theme';


export const Container = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    button {
        width: 30%;
    }
`

export const InputContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;

    gap: 3.7rem;
`;

export const InputColumn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    gap: 1.2rem 0;
`;