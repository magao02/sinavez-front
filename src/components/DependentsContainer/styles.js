import styled from "styled-components";
import theme from '../../styles/theme';

export const Container = styled.div`
  width: 80%;
  height: 80%;

  display: grid;

  flex-direction: column;
  align-items: start;

  margin: 1.9rem 13.9rem;

  background-color: white;

  border: 1px solid black;
  border-radius: 2.4rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
`;

export const Title = styled.h1`
  align-self: center;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  gap: 7.3rem;
  padding: 0 19rem;
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center
  align-items: center;

  gap: 3.4rem;

  span {
    color: ${theme.colors.red};
    text-align: center;
    font-weight: bold;
  }
`;