import styled from 'styled-components';
import theme from '../../../styles/theme';

export const Container = styled.form`
    z-index: 100;
    position: absolute;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    padding: 16px 24px;

    background-color: ${theme.colors.white.default};

    width: 29.25vw;
    flex-direction: column;

    border-radius: 4px;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.20), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
`;

export const InputsContainer = styled.div`
    display: grid;
    grid-template-columns: 45% 45%;
    gap: 10%;

`;

export const Head = styled.form`
    display: grid;
    grid-template-columns: 85% 5%;
    justify-content: center;
    align-items: center;
    align-self: stretch;

    width: 29.25vw;
    margin-left: -24px;

    border-bottom: 1px solid var(--azul-1, ${theme.colors.blue.lighter});

    color: var(--text-primary, ${theme.colors.gray.menu});

    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;

    padding-bottom: 1vw;

    img {
        border-radius: 50%;
        &:hover {
            cursor: pointer;
        }
    }
`;

export const Body = styled.div`
    margin-top: 2vh;
    width: 100%;
    display: flex;
    flex-direction: column;

`;

export const Description = styled.p`
    display: flex;

    flex-direction: column;
    justify-content: center;

    color: var(--text-primary, ${theme.colors.gray.menu});
    text-align: center;

    font-size: 16px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`

export const Main = styled.div`
    margin: 2vh 0px 2vh 0px;
    display: flex;
    padding: 24px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 52px;
    width: 100%;

    border-radius: 8px;
    border: 1px solid var(--azul-1, ${theme.colors.blue.background});
    background: var(--azul-3, ${theme.colors.blue.light});
`

export const Footer = styled.div`
    display: flex;
    height: 62px;
    justify-content: center;
    align-items: center;
    align-self: stretch;

    gap: 2vw;
`

export const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
`

export const SubTitle = styled.h3`
    color: var(--text-primary, ${theme.colors.gray.menu});

    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`