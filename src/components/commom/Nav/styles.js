import styled from 'styled-components';
import theme from '../../../styles/theme';

export const NavBar = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    position: absolute;

    box-shadow: 0px 4px 4px rgba(7, 96, 186, 0.44);
    background-color: ${theme.colors.white};
`;

export const LogoSinavez = styled.div`
    margin-left: 113px;
    display: flex;
    gap: 2px;
`

export const UserFeaturesLeft = styled.div`
    width: 100%;

    display: flex;
    justify-content: start;

    padding-left: 2.3rem;
    gap: 40px;
`;

export const UserFeaturesRight = styled.div`
    width: 100%;

    display: flex;
    justify-content: end;
    align-items: center;

    margin-right: 81px;
`;
