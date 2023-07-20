import styled from 'styled-components';
import theme from '../../styles/theme';
import icon_add_picture from '../../assets/img/icon_add_picture.png';


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
    margin-top: ${props => props.marginTop ? '50px' : '0px'};
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
    flex-direction: column;
    width: 374px;
    height: 114px;
`

export const ProfileAvatar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 112.03px;
    height: 114px;
    border-radius: 100%;
    border: 1px solid #C5DBF2;
    background-color: #EDF6FF;
    position: relative;

    &:before {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        content: url("data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1660_109089)'%3E%3Cpath d='M12.6896 15.5C14.7607 15.5 16.4396 13.8211 16.4396 11.75C16.4396 9.67893 14.7607 8 12.6896 8C10.6186 8 8.93964 9.67893 8.93964 11.75C8.93964 13.8211 10.6186 15.5 12.6896 15.5Z' stroke='%23FF730E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M6.67206 19.1904C7.23635 18.0789 8.09739 17.1454 9.15975 16.4933C10.2221 15.8413 11.4443 15.4961 12.6908 15.4961C13.9373 15.4961 15.1595 15.8413 16.2219 16.4933C17.2842 17.1454 18.1453 18.0789 18.7096 19.1904' stroke='%23FF730E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M17.1896 5.75H21.6896' stroke='%23FF730E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M19.4396 3.5V8' stroke='%23FF730E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M21.5636 11C21.88 12.88 21.5907 14.812 20.7376 16.5169C19.8844 18.2217 18.5114 19.6114 16.817 20.4851C15.1225 21.3588 13.1942 21.6714 11.3105 21.3777C9.42684 21.084 7.68522 20.1992 6.33716 18.8512C4.9891 17.5031 4.10435 15.7615 3.81066 13.8778C3.51697 11.9941 3.82955 10.0658 4.70325 8.37135C5.57696 6.67689 6.96658 5.30395 8.67147 4.45076C10.3764 3.59758 12.3083 3.30832 14.1883 3.62473' stroke='%23FF730E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1660_109089'%3E%3Crect width='24' height='24' fill='white' transform='translate(0.689636 0.5)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");

        width: 40px;
        height: 40px;
        background-color: #EDF6FF;
        border-radius: 100px;
        top: 0.5px;
        left: 74.69px;
        box-shadow: 0px 6px 10px 0px #00000024; 
        cursor: pointer;
    }
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
    font-size: 14px;
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
        
    font-size: ${props => props.title ? `22px` : `18px`};
    font-style: normal;
    font-weight: ${props => props.title ? `600` : `500`};
    line-height: normal;
`