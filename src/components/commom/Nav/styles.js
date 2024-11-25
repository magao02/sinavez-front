import styled from 'styled-components';
import theme from '../../../styles/theme';

export const NavBar = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 8.3vh;
    position: absolute;
    z-index: 110;

    box-shadow: 0px 4px 4px rgba(7, 96, 186, 0.44);
    background-color: ${theme.colors.white.default};
`;

export const LogoSinavez = styled.div`
    width: 8.18vw;
    height: 7.5vh;

    margin-left: 113px;
    display: flex;
    gap: 2px;
    @media (max-width: 425px) {
    display: none;
  }
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
