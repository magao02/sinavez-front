import styled from 'styled-components';
import theme from '../../styles/theme';


export const Container = styled.form`
    margin-top: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    button {
        margin-top: 2%;
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

export const InputYear = styled.div`
    width: 100%;
    margin-left: 50%;
    display: flex;
`;
