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