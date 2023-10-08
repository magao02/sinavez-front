import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    margin-bottom: 20px;
`

export const Placeholder = styled.span`
    color: gray;
    margin-top: ${(props) => props.typeMargin == "number" ? "-34px" : "-50px"};
`

export const Label = styled.label`
    display: flex;
    flex-direction: column;

    @media (max-width: 1092px ){
        font-size: 15px;
    }

    @media (max-width: 1024px ){
        font-size: 12px;
    }
`