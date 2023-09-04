import styled from "styled-components"
import theme from "../../../styles/theme"

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 100%;
    padding: 8px;
    gap: 5px;
    border: 1px solid #609AD5;
    border-radius: 10px;

    span{
        color: gray;
        font-size: 13.5px;
    }
`

export const ContainerSelect = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 100%;
    padding: 3px;
    gap: 5px;
    border-radius: 8px 8px 0px 0px;
    border: 1px solid #609AD5;

    span{
        color: gray;
        font-size: 12px;
    }
`

export const OpenedMenuBox = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 1px solid #609AD5;
    width: 100%;
    background-color: white;
    border-radius: 0px 0px 8px 8px;
`

export const Select = styled.div`
    position: absolute;
    width: 12%;
`

export const OptionContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 10px;
    padding: 10px;
`

export const Option = styled.span`
    cursor: pointer;
    width: 100%;
    display: flex;
    color: var(--text-secundary, ${theme.colors.gray.default});
    font-size: 15px;
    font-family: Roboto;
    justify-content: center;
    line-height: 22px;
    gap:10px;

    &:hover{
        color: #0660BA;
    }
`