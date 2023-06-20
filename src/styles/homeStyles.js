import styled from 'styled-components';
import theme from './theme';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${theme.colors.white};

    position: fixed;
    display: flex;
    flex-direction: column;
`;

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
    display: flex;
    gap: 37%;
`

export const Title = styled.div`
    width: 311px;
    height: 72px;

    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 36px;

    color: #FDFDFD;

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

    color: #FDFDFD;

    flex: none;
    order: 1;
    flex-grow: 0;
`

export const Button = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;

    width: 219px;
    height: 42px;

    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.2);
    border-radius: 4px;

    flex: none;
    order: 1;
    flex-grow: 0;

    background-color: ${theme.colors.white};

    &:hover{
        cursor: pointer;
    }
`


export const Texts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 32px;

    width: 488px;
    height: 280px;

    flex: none;
    order: 0;
    flex-grow: 0;
`