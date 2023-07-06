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

export const InputBox = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const LinkBox = styled.div`
    margin-top: 2.25vh;
    align-self: flex-start;
`

export const Link = styled.a`
    color: ${theme.colors.blue.heavy};
    font-size: 14px;
    font-family: Roboto;
    line-height: 18px;
    align-self: flex-start;
`;

export const ButtonContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 2vh;
    margin-bottom: 2vh;

    a {
        color: ${theme.colors.red};
        font-weight: bold;
    }
`;

export const Description = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;

    color: var(--text-secundary, ${theme.colors.gray.default});

    font-size: 13px;
    line-height: 14px;
`