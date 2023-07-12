import styled from "styled-components";

export const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.9em;
  color: #777;
  & > img {
    border-radius: 50px;
  }
`;

const round = "10px";

export const Card = styled.div`
  display: flex;
  border: 2px solid #ddf;
  border-radius: ${round};
  gap: 15px;

  // TODO: need a better way of doing this
  & > img {
    border-radius: ${round} 0 0 ${round}; 
  }
`;

export const ButtonContainer = styled.div`
  margin-left: auto;
  padding: 20px;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin: 20px 0;
`;

export const Title = styled.h1`
  font-size: 1.3em;
  color: #444;
`;

export const Reserva = styled.span`
  color: #777;
  font-size: ${props => props.small ? "0.9em" : "1.0em"};
`;

export const Features = styled.div`
  margin-top: auto;
  display: flex;
  gap: 15px;
`;
