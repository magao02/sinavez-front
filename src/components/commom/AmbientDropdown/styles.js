import styled from "styled-components"
import theme from "../../../styles/theme"

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 100%;
    padding: 8px;
    padding-left: 20px;
    gap: 10px;
    border: 1px solid #609AD5;
    border-radius: 4px;
    background-color: #0660BA;
    color: white;
`

export const ContainerSelect = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 100%;
    width: 100%;
    padding: 9px;
    padding-left: 20px;
    gap: 10px;
    border: 1px solid #609AD5;
    border-radius: 4px;
    background-color: #0660BA;
    color: white;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`

export const OpenedMenuBox = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    background-color: white;
    border-radius: 0px 0px 8px 8px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
`

export const Select = styled.div`
    position: absolute;
    width: 12vw;
`

export const OptionContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: first baseline;
    align-items: center;
    justify-content: center;
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
    align-items: center;
    line-height: 22px;
    gap:10px;
    margin-left: 2vw;

    &:hover{
        color: #0660BA;
    }
`