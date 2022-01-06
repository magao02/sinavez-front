import styled from 'styled-components';
import theme from '../../../styles/theme';

export const NavBar = styled.nav`
    width: 100%;
    display: flex;

    background-color: ${theme.colors.blue.default};
    padding: 1rem 0;

    a {
        text-decoration: none;
        font-size: 1.6rem;
        font-weight: bold;
        color: ${theme.colors.white};

        text-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0 , 0.25);
    }
`;

export const UserFeaturesLeft = styled.div`
    width: 100%;

    display: flex;
    justify-content: start;
    align-items: center;

    padding-left: 2.3rem;
    gap: 5.6rem;

`;

export const UserFeaturesRight = styled.div`
    width: 100%;

    display: flex;
    justify-content: end;
    align-items: center;

    padding-right: 3.7rem;

    gap: 5.6rem;
`;
