import styled, { keyframes } from 'styled-components';
import theme from './theme';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${theme.colors.white.default};

    display: flex;
    flex-direction: column;
`;

export const BottomCotainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

`

export const BottonTitle = styled.div`
    color: var(--text-primary, ${theme.colors.gray.menu});

    font-size: 24px;
    font-weight: 600;
    line-height: 28px;

    display: flex;
    align-items: center;
    gap: 0.5vw;
`

export const BottonMainContent = styled.div`
    margin-top: 10vh;
    margin-left: 10%;

    display: flex;
    z-index: 1;
    flex-direction: column;
`

export const BottonMain = styled.div`
    margin-top: 2vh;

    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2vw;
`

export const Main = styled.div`
    width: 100%;
    height: 100%;
    left: 0px;
    top: 75px;

    background: linear-gradient(180deg, #032E58 3.3%, #0760BA 55.05%, #5D9BDA 105.74%);
`;

export const MainContent = styled.div`
    margin-top: 15%;
    margin-left: 10%;
    display: grid;
    grid-template-columns: 50% 50%;
`

export const Title = styled.div`
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 36px;

    color: ${theme.colors.white.light};

    flex: none;
    order: 0;
    flex-grow: 0;
`

export const Text = styled.div`
    width: 488px;
    height: 110px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;

    color: ${theme.colors.white.light};

    flex: none;
    order: 1;
    flex-grow: 0;
`

export const Texts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 32px;

    flex: none;
    order: 0;
    flex-grow: 0;
`

export const BottonDetail = styled.div`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 100px;
`

export const TextsBottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3vh;
`

export const TitleBottom = styled.h6`
    color: var(--text-invertido, ${theme.colors.white.light});

    font-size: 22px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`

export const TextBottom = styled.p`
    color: var(--text-invertido, ${theme.colors.white.light});

    font-size: 16px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;

    text-align: start;
`

export const BottomDivider = styled.div`
    height:1.52px;
    border-radius: 5px;
    background-color: ${theme.colors.blue.heavy};
    margin: 5vh 8vw;
`

export const LinkText = styled.p`
    color: var(--text-invertido, ${theme.colors.white.light});

    font-size: 16px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: 0.15px;
`

export const Sublime = styled.div`
    height: 2px;
    background-color: ${theme.colors.white.light};
    align-self: stretch;
    opacity: 0.4000000059604645;
    position: relative;
    bottom: 6px;
`

const FadeIn = keyframes`
  from {
    opacity: 0%;
  }
  to {
    opacity: 100%;
  }
`;

export const InfoToolTip = styled.div`
    position: absolute;
    left: 100%;
    top: 0;
    margin-left: 10px;

    display: flex;
    padding: 4px 8px;
    align-items: center;
    border-radius: 4px;
    background: ${theme.colors.orange.default};

    color: white;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;

    width: max-content;
    max-width: 80vw;
    transform: translateY(-25%);

    animation: 0.1s linear 0s ${FadeIn};
`;