import styled from "styled-components";
import theme from '../../styles/theme';

export const FormContainer = styled.form`
  width: 50%;
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