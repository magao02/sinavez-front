import styled from 'styled-components';
import theme from '../../../styles/theme';

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  align-self: center;

  width: 80%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    color: ${theme.colors.red};
    font-weight: bold;
  }
  
`;

export const InputForm = styled.form`
  width: 80%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 415px) {
    grid-template-columns: repeat(1, 1fr);
  }
  
  gap: 2.4rem;
  padding: 8em 1rem 0rem 1rem;

`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5.4rem;
  width: 100%;
`;

