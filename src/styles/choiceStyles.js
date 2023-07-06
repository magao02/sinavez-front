import styled from 'styled-components';
import theme from './theme';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(180deg, #032E58 0%, #0760BA 50.52%, #5D9BDA 100%);

    color: white;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

export const Title = styled.span`
    position: absolute;
    top: 176px;

    font-size: 32px;
    font-weight: 700;
`;

export const TitleOrange = styled.span`
    color: #FF730E;
`;

export const Buttons = styled.div`
    display: flex;
    gap: 64px;
`;

export const Button = styled.div`
    background: red;
    padding: 34px;
    width: 423px;
    height: 298px;

    border-radius: 8px;
    background: var(--azul-1, #5D9BDA);
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.50);

    transition: 0.3s;

    &:hover {
        background: #78b1eb;
        cursor: pointer;
    }

    &:active {
        background: #82b7ed;
        scale: 0.98;
    }

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    user-select: none;
`;

export const ButtonImage = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PatternContainer = styled.div`
    position: absolute;
    background-image: ${props => `url(${props.src})`};

    width: 100vw;
    height: 20vh;
    bottom: 0;
`;