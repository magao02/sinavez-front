import styled, { keyframes } from "styled-components";
import theme from "./theme";
import { Title2, Subtitle2 } from "./commonStyles";

export const NavSpacing = styled.div`
  height: 8.3vh; // copied from the Navigation's height
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  @media(min-width: 1400px) {
    padding: 0 10vw;
  }
  margin-bottom: 64px;
  margin-top: 60px;
`;

export const Details = styled.div`
  display: flex;
  gap: 24px;
  margin: 32px 0;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 50%;
`;

export const Breadcrumbs = styled.div`
  display: flex;
  padding: 10px 0;
  gap: 16px;
  margin: 32px 0;
  margin-top: 0;
`;

export const BlueBackgroundCard = styled.div`
  background: ${theme.colors.blue.shadow};
  border-radius: 8px;
`;

export const ReservationDetailsCard = styled(BlueBackgroundCard)`
  padding: 24px;
  display: flex;
  flex-direction: column;

  .title {
    margin-bottom: 24px;
  }
  
  .row {
    display: flex;
    gap: 16px;
    justify-content: space-between;
    align-items: center;
  }

  .row-separator {
    flex: 1 0 0;
    align-self: stretch;
    border-bottom: 2px solid ${theme.colors.blue.heavy};
    margin: 16px 0;
  }

  .top-spacing {
    margin-top: 24px;
  }

  .button-container {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

export const RulesCard = styled(BlueBackgroundCard)`
  background: ${theme.colors.blue.light};
  padding: 24px;

  ol {
    list-style-position: inside;
    margin-top: 24px;
    display: grid;
    gap: 16px;
  }
`;

export const WarningCard = styled(BlueBackgroundCard)`
  background: ${theme.colors.yellow.light};
  padding: 14px 16px;
  display: flex;
  align-items: start;
  gap: 12px;
`;

export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  img {
    border-radius: 16px;
  }
`;


export const CardWithName = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 24px;

  img {
    border-radius: 8px;
    object-fit: fill;
    width: 36%;
  }

  .text {
    display: flex;
    flex-direction: column;
  }
`;

export const TripDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;