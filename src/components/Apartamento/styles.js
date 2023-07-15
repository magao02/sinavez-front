import styled from "styled-components";

export const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  font-size: 16px;
  color: #777;
`;

export const Card = styled.div`
  display: flex;

  border-radius: 8px;
  border: 1px solid var(--azul-2, #C5DBF2);

  overflow: hidden;
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

export const Title = styled.h1`
  font-size: 24px;
  color: #444;
`;

export const Reserva = styled.span`
  color: #777;
  font-size: ${props => props.small ? "16px" : "18px"};
`;

export const Features = styled.div`
  margin-top: calc(32px - 10px);
  display: flex;
  gap: 16px;
`;
