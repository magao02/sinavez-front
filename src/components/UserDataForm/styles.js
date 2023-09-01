import styled from 'styled-components';
import theme from '../../styles/theme';

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

    width: ${props => props.width ? '100%' : '29.25vw'};
    margin: ${props => props.margin ? '21px' : '0px'};
    margin-left: ${props => props.marginLeft ? '0px' : '-24px'};

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
    height: ${props => props.height ? '853px' : '100%'};

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
    gap: ${props => props.gap ? '5px' : '16px'};
    align-self: stretch;
    margin-top: ${props => props.marginTop ? '20px' : '0px'};
`

export const SubTitle = styled.h3`
    color: var(--text-primary, ${theme.colors.gray.menu});
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`

export const Profile = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 24px;
    align-self: stretch;
    margin-top: 24px;
    margin-bottom: 16px;
`

export const ProfileContainerImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ProfileArguments = styled.div`
    display: flex;
    flex-direction: ${props => props.direction ? 'row' : 'column'};
    width: 374px;
    height: 114px;
    padding: ${props => props.padding ? '12px 0px 8px 0px' : '0px 0px 0px 0px'};
    gap: ${props => props.padding ? '18px' : '0px'};
    `

export const ProfileAvatar = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 112.03px;
    height: 114px;
    border-radius: 100%;
    border: 1px solid #C5DBF2;
    
    background-color: #EDF6FF;
    background-size: 100% auto;
    background-position: center;
`

export const ProfileAvatarAddPicture = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;

    width: 40px;
    height: 40px;
    background-color: #EDF6FF;
    border-radius: 100px;
    top: 0.5px;
    left: 74.69px;
    box-shadow: 0px 6px 10px 0px #00000024; 
    cursor: pointer;
`

export const ProfileTitle = styled.h1`
    color: var(--text-primary, ${theme.colors.gray.menu});

    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding: 8px 0 8px 0;
`

export const ProfileDescription = styled.p`
    color: var(--text-secundary, ${theme.colors.gray.default});

    font-family: Roboto;
    font-size: ${props => props.size ? '16px' : '14px'};
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    padding: 8px 0 8px 0;
`

export const MainHead = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;
`

export const Text = styled.p`
    color: ${props => props.title ? `color: var(--text-primary, ${theme.colors.gray.menu})` : `var(--azul-1, ${theme.colors.blue.background})`};
    font-family: roboto;
    font-size: ${props => props.title ? `22px` : `18px`};
    font-style: normal;
    font-weight: ${props => props.title ? `600` : `500`};
    line-height: normal;
`

export const SubContainerDependents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
    margin-top: ${props => props.marginTop ? '20px' : '0px'};
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 3px;
        background-color: #F5F5F5;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #C5DBF2;
        border: 2px solid #F5F5F5;
    }

    ::-webkit-scrollbar-track {
        background-color: #F5F5F5;
    }
`