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