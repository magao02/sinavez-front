import styled from 'styled-components';
import theme from '../../../styles/theme';

export const NavBar = styled.nav`
    width: 100%;
    height: 100%;
    
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 5.6rem;

    padding-left: 2.3rem;
    

    background-color: ${theme.colors.blue.default};

    a {
        text-decoration: none;
        font-size: 1.6rem;
        font-weight: bold;
        color: ${theme.colors.white};

        text-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0 , 0.25);
    }
`;