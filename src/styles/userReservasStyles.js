import styled from "styled-components";
import theme from "./theme";

export const Card = styled.div`
  display: flex;

  border-radius: 8px;
  border: 1px solid var(--azul-2, #C5DBF2);

  overflow: hidden;
  cursor: pointer;
`;

export const CardInner = styled.div`
  display: flex;
  width: 100%;
  padding: 24px;
`;

export const CardImage = styled.div`
  width: 415px;
  flex-shrink: 0;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 1.77
  }
  & > p {
    position: absolute;
    margin-top: 25px;
    text-align: right;
    padding: 8px 20px;
    width: 145px;

    border-radius: 0px 100px 100px 0px;
    background: ${props => props.reservado ? theme.colors.orange.default : theme.colors.green.default};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    font-size: 14px;
    color: ${theme.colors.white.light};
    user-select: none;
  }
`;
export const ButtonContainer = styled.div`
  margin-left: auto;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Features = styled.div`
  margin-top: auto;
  display: flex;
  gap: 16px;
`;
export const StyledButton = styled.button`
  background-color: #e63946;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d62839; /* Cor mais escura ao passar o mouse */
  }
`;

