import styled from "styled-components";

export const Container = styled.div`
  z-index: ${props => props.zIndex? '100' : '99'};

  position: absolute;
  height: ${props => props.pageHeight};
  width: 100vw;

  background-color: black;
  opacity: 50%;
`