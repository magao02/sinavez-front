import styled, { keyframes } from 'styled-components';
import theme from './theme';

export const Container = styled.div`
    width: 100vw;
    height:  ${props => props.master ? "60%" : "100%"};
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
    justify-content: start;
    flex-wrap: wrap;
    gap: 2vw;
`

export const BottonMainCad = styled.div`
    margin-top: 4vh;

    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
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
    padding-bottom: ${props => props.master ? "50px" : "0"};
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

export const ToggleCard = styled.div`
    width: ${props => props.alt ? "250%" : "100%"};
    height: 300vh;
    top: ${props => props.alt ? "-20%" : "0"};
    left: ${props => props.alt ? "-80%" : "0"};
    background-color: black;
    position: absolute;
    opacity: 0.5;
`;

export const Card = styled.div`
    width: 100%;
    height:  ${props => props.alt ? "150vh" : "240vh"};
    top: 0;
    left: 0;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CardPreCadastro = styled.div`
    display: inline-flex;
    padding: 72px;
    align-items: flex-start;
    gap: 8px;
    background-color: white;
    border-radius: 16px;
    background: var(--Azul-3, #EDF6FF);
    width: 592px;
    height: 712px;
    position: relative;
`;

export const ContainerPreCadastro = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 9px;
`;

export const TitlePreCadastro = styled.h3`
    color: var(--text-accent, #0760BA);
    text-align: center;
    font-family: Jost;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

export const SpanInput = styled.span`
    top: -11px;
    position: relative;
    color: ${props => props.span ? "red": "#747880" };
    font-size: 12px;
`;

export const CloseDiv = styled.div` 
    position: absolute;
    width: 24px;
    height: 24px;
    z-index: 100;
    right: 35px;
    top: 22px;
    cursor: pointer;
`;

export const TitleMaster = styled.h2`
    color: var(--text-invertido, #FDFDFD);
    font-family: Jost;
    font-size: 42px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px; /* 125% */
`;

export const TextMaster = styled.p`
    color: var(--text-invertido, #FDFDFD);
    font-family: Jost;
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: 38.5px; /* 160.417% */
`;

export const SpanMaster = styled.span`
    color: var(--laranja-2, #FFAD72);
    font-family: Jost;
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: 38.5px;
`;

export const ContainerLabel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 20px;
`;  

export const Label = styled.label`
    color: #3D3F45;
    font-size: 16px;
`;

export const SpanLabel = styled.span`
    color: ${props => props.color ? "red": "" };
    margin-left: ${props => props.margin ? "8px": "" };
`;

export const ContainerInputLabel = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 48px;
    width: 196px;
`;
export const RegistrationWrapper = styled.div`
    width: 100vw;
`

export const RegistrationContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #EDF6FF;
    padding: 5vw;
    padding-left: 10vw;
    padding-right: 10vw;
`

export const MainRegistrationContent = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 10px;
`

export const ImageRegistrationWrapper = styled.div`
    width: 50%;

    img{
        height: 100%;
    }

    @media(max-width: 1063px){
        img{
            width: 90%
        }
    }
    
`


export const CompleteRegistrationContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    gap: 7.1vh;

`

export const TitleRegistrationArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const TextRegistration = styled.div`
    display: flex;
    align-items: center;
    width: 70%;

    @media(max-width: 1063px){
        font-size: 12px;
    }
`

export const BorderRegistration = styled.div`
    border: 3px solid #0660BA;
    width: 17%;
`

export const ButtonRegistrationContainer = styled.div`
    display: flex;
    align-items: center;
`

export const ButtonRegistraion = styled.button`
    background-color: #0660BA;
    border: none;
    color: white;
    padding: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 4px;
    display: flex;
    align-items: stretch;
    gap: 15px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    outline: none;

    &:hover{
        background-color: #0472e0;
        transition: all .5s;
    }
`

