import styled from 'styled-components';
import theme from './theme';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    background: linear-gradient(90deg, #032E58 0%, #0760BA 50.52%, #5D9BDA 100%);

    display: flex;
`

export const Details = styled.div`
    position: relative;

    display: flex;

    justify-content: flex-start;
    align-itens: center;

    flex-wrap: nowrap;
`

export const RightContent = styled.div`
    display: flex;

    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 5vh;

    margin-right: 10%;
    margin-bottom: 4%;
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
`

export const MenuBox = styled.div`
    display: flex;

    justify-content: center;
    flex-direction: column;
    align-items: center;

    gap: 1.25vh;

    color: var(--background, ${theme.colors.white});
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