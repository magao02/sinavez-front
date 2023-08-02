import styled from "styled-components";
import theme from '../../styles/theme';

export const ContainerWhite = styled.div`
    z-index: 99;
 
    position: absolute;
    width: 100vw;
    height: 150vh;
    background-color: ${theme.colors.white.default};
    display: flex;
    justify-content: center;
    align-items:center;
    margin-top: 0px;
    box-sizing: border-box;
`;

export const BoxData = styled.div`
    position: relative;
    width: 1215px;
    height: 1381px;
    padding: 0px 0px 32px 0px;
    gap: 24px;
    top: 117px
`;

export const LinkPage = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 446px;
    height: 40px;
    padding: 10px 8px;
    gap: 10px;
`;

export const LinkAtual = styled.div`
    color: #5D9BDA;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    text-decoration: underline;
    cursor: pointer;
`;

export const ProfileUser = styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    width: 1215px;
    align-items: flex-start;
    gap: 24px;
    margin-bottom: 48px;
`;

export const ProfileTitleUser = styled.h1`
    width: 890px;
    height: 34.039px;
    color: #3D3F45;
    font-family: roboto;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    gap-bottom: 24px;
`;

export const TableAssociate = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 0 0;
    align-self: stretch;

    width: 100%;
`;

export const TextTable = styled.th`
    width: 607.5px;
    height: 66px;
    color: ${props => props.selected ? '#0760BA' : '#5D9BDA'};
    font-family: roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
    cursor: pointer;
`;

export const ContainerTable = styled.div`
    height: 56px;
    display: flex;
    padding: 9px 16px;
    justify-content: center;
    align-items: center;
    border-bottom: ${props => props.selected ? '4px solid #0760BA' : '2px solid #5D9BDA'};
`;

export const ContainerData = styled.div`
    height: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 120px;
    align-self: stretch;

    border-radius: 8px;
    border: 1px solid #5D9BDA;
    background: #EDF6FF;
`;

export const ContainerDataUser = styled.div`
    display: flex;
    height: 866px;
    flex-direction: column;
    align-items: flex-start;
    gap: 48px;
`;

export const ContainerButtons = styled.div`
    display: flex;
    padding: 24px;
    justify-content: center;
    align-items: center;
    gap: 24px;
`;

export const ContainerPageDependents = styled.div`
    display: flex;
    align-items: center;
    gap: 54px;
    margin-top: 48px;
    height: 374px;
`;

export const ContainerDialogo = styled.div`
    display: flex;
    width: 629px;
    height: 160px;
    padding: 0px 39px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 12px;
`;

export const DependentsTitle = styled.div`
    display: flex;
    padding: 16px 0px;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;

    color: #3D3F45;
    font-family: roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
`;

export const ContainerImage = styled.div`
    width: 466px;
    height: 379px;
`;

export const ContainerButtonCancel = styled.div`
    position: absolute;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 1310px;
    background: #FAFBFF;
`;

export const LineButton = styled.div`
    width: 1120px;
    height: 74px;
    display: flex;
    border-radius: 8px;
    border: 1px solid #0760BA;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ContentButton = styled.div`
    display: flex;
    flex-direction: ${props => props.direction ? 'row' : 'row-reverse'};
    align-items: center;
    width: 50%;
    height: 45px;
    gap: 15px;
    margin: 15px;
`;

export const Aviso = styled.h4`
    font-family: roboto;
    line-height: 26.01px;
    font-weight: 500;
    font-size: 16px;
`;
