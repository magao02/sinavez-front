import styled from "styled-components";


export const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 10vh;
`

export const Header = styled.div`
    height: 10vh;
    width: 100%;
    position:relative;
`

export const MainContent = styled.div`
    width: 60vw;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 3vh;
    margin-top: 2vh;

    @media (max-width: 1372px) {
        width: 80vw;
    }
`

export const SearchArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`

export const FiltersArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 60%;
    height: ${props => props.alt ? "44px" : "40px"};
    gap: .5vw;
    margin-left: ${props => props.alt ? "16px" : "0"};
`

export const AddAmbienteArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    width: 20%;
    height: 40px;
`

export const InputArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #609AD5;
    width: ${(props) => props.width};
    gap: ${(props) => props.gap};
    border-radius: 10px;
    padding-left: ${(props) => props.paddingLeft};
    height: 100%;

    input{
        background-color: white;
    }
`

export const DropdownArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 25%;
    gap: 0px;
    padding-left: 0px;
    height: 100%;

    @media (max-width: 1372px) {
        width: 35%;
    }
`

export const Select = styled.select`
    appearance: none;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    border: none;
    outline: none;
    background: none;
    padding: 10px;
    color: #757881;
    

    &:focus {
        outline: none;
        border-color: blue;
    }

    option{

    }
`

export const Button = styled.button`
    height: 100%;
    border: none;
    outline: none;
    background-color: #0761BB;
    padding: 5px 20px;
    border-radius: 5px;
    color: white;
    display: flex;
    gap: 10px;
    align-items: center;

`

export const ToggleArea = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1vh;
`

export const SelectAmbient = styled.div`
    width: 100%;
    height: 66px;
    display: flex;
    align-items: center;
    flex-direction: row;
`

export const AmbienteTitle = styled.div`
    height: 100%;
    width: 50%;
    border-bottom: ${(props) => props.isSelected ? "4px solid #0761BB" : "2px solid #DEEBF9"};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.isSelected? "#0761BB" : "#5C9ADA"};
    font-size: 20px;
`

export const AmbientsArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

export const AmbientWrapper = styled.div`
    width: 100%;
`

export const LoadItens = styled.div`
    height: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1vh;
`

export const VerMaisButtons = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    background-color: white;
    color: #0761BB;
`

export const LoadingContainer = styled.div`
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
`