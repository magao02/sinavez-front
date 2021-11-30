import styled from 'styled-components';

import theme from '../../../styles/theme';

export const Container = styled.button`
    width: 100%;
    padding: 1.3rem 13.2rem 1.3rem 13.2rem;
    border: none;
    border-radius: 2.4rem;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.4rem;
    color: ${theme.colors.white};
    background-color: ${theme.colors.blue.default};

    &:hover {
        filter: brightness(80%);
    }
`;