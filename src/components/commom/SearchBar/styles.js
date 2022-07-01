import styled from "styled-components";

export const Container = styled.div`
  width: 20%;

  display: grid;
  align-items: center;
  grid-template-columns: 20% 80%;

  border: 1px solid black;
  border-radius: 0.7rem;

  padding: 0.95rem;
  min-width: 360px;

  input {
    width: 100%;
    text-decoration: none;
    border: none;
    background-color: transparent;
    outline: none;
    padding: 0;
  }
`;
