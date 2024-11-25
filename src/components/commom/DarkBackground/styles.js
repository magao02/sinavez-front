import styled from "styled-components";

export const Container = styled.div`
  z-index: ${props => props.zIndex? '100' : '99'};

  position: fixed;
  height: 100%;
  width: 100%;

  background-color: black;
  opacity: 50%;

    
`