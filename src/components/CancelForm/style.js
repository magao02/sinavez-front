import styled from "styled-components";
import theme from '../../styles/theme';

export const ContainerCancel = styled.div`
    z-index: 100;
    position: absolute;

    width: 100vw;
    height: 150vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
`;

export const CancelBox = styled.div`
    width: 900px;
    height: 366px;
    background-color: ${theme.colors.white.default};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
`;

export const TitleCancel = styled.div`
    width: 100%;
    height: 36px;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    color: var(--text-primary, ${theme.colors.gray.menu});
    margin: 16px 24px;
    align-self: stretch;
`

export const CancelOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    width: 100%;
    height: 100%;
    gap: 32px;
    padding: 20px 24px;
`;

export const TextCancel = styled.p`
    color: var(--text-primary, ${theme.colors.gray.menu});
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    width: 434px;
`;

export const ButtonCancel = styled.div`
    width: 100%;
    height: 58px;
    display: flex;
    padding: 8px;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    align-self: stretch;
`;

