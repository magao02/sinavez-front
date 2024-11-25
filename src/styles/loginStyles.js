import styled from 'styled-components';
import theme from './theme';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    background: linear-gradient(90deg, #032E58 0%, #0760BA 50.52%, #5D9BDA 100%);
    gap: 20vw;

    display: flex;
    position: fixed;
`

export const WhiteContainer = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    position: fixed;
    justify-content: space-between;
    z-index: 1;
`

export const Details = styled.div`
    position: relative;

    display: flex;

    justify-content: flex-start;
    align-items: center;

    z-index: 2;
    flex-wrap: nowrap;

    max-width: 33vw;
    @media (max-width: 425px) {
    display: none;
  }
`

export const RightContent = styled.div`
    display: flex;

    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 5vh;

    margin-right: 10%;
    margin-bottom: 4%;
    @media (max-width: 425px) {
        width: 100%;
        height: 95%;
        margin: 0;
        padding: 120px 0;
        gap: 2vh;
        z-index: 999;

    }
`

export const PatternBox = styled.div`
    position: absolute;
    z-index: 1;

    opacity: ${props => props.lighter ? "30%" : "unset"};
`

export const LoginBox = styled.div`
    width: 35vw;

    display: flex;
    flex-direction: column;
    padding: 10%;
    
    align-items: flex-start;
    gap: 3vh;

    border-radius: 16px;
    border: 1px solid var(--azul-2, ${theme.colors.blue.border});
    background: var(--azul-3, ${theme.colors.blue.light});

    @media (max-width: 425px) {
        width: 90%;   
    }
`

export const MenuBox = styled.div`
    display: flex;

    justify-content: center;
    flex-direction: column;
    align-items: center;

    gap: 1.25vh;

    color: ${ props => props.blue ? `var(--text-accent, ${theme.colors.blue.heavy})` : `var(--background, ${theme.colors.white.default})`};
    text-align: center;

    font-size: 22px;
    font-weight: 600;
`

export const Logo = styled.div`
    display: flex;

    justify-content: center;
    flex-direction: column;
    align-items: center;

    gap: 2vh;
`

export const Title = styled.p`
    color: var(--text-accent, ${theme.colors.blue.heavy});
    text-align: center;
    font-size: 22px;
    font-weight: 600;
`