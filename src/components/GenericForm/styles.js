import styled from 'styled-components';
import theme from '../../styles/theme';

export const InputContainer = styled.form`
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    gap: ${(props) => props.gap ? props.gap : "1.6rem"};

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

export const Description = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;

    color: var(--text-secundary, ${theme.colors.gray.default});

    font-size: 13px;
    line-height: 14px;
`