import styled from 'styled-components';
import theme from '../../styles/theme';

export const InputContainer = styled.form`
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    gap: 1.6rem;

    padding-bottom: 0.8rem;

    @media (max-width: 320px) {
        padding-bottom: 1.5rem;
    };
`;

export const Link = styled.a`
    color: ${theme.colors.dark.heavy};
    align-self: flex-end;
`;

export const ButtonContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 1rem;

    margin-top: 9.6rem;
    margin-bottom: 2.4rem;

    a {
        color: ${theme.colors.red};
        font-weight: bold;
    }
`;