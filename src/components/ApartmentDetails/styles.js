import styled, { keyframes } from "styled-components";
import theme from "../../styles/theme";
import { Title2, Subtitle2 } from "../../styles/commonStyles";

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
`;

export const Details = styled.div`
  display: flex;
  gap: 24px;
  margin: 32px 0;
  justify-content: space-between;

  @media (max-width: 425px) {
    flex-direction: column;
    width: 140%;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  &.features-column {
    flex: 1;
  }
`;

export const BlueOutlineCard = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  gap: 10px;

  border-radius: 8px;
  border: 1px solid ${theme.colors.blue.lighter};
  background: ${theme.colors.white.default};
`;

export const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 6px;
`;

export const FeatureCard = styled.div`
  display: flex;
  padding: 4px 16px;
  align-items: flex-start;
  gap: 13px;
  align-items: center;
  border-radius: 8px;
  background: ${theme.colors.blue.light};

  flex: none;
  /* width: calc(33% - 3px); */
  /* width: 247px; */
  width: max(32.6%, 247px);
`;

export const ImageGallery = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  gap: 8px;
  height: 285px;

  img {
    object-fit: cover;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    width: 33%;
  }

  position: relative;
  
  .button {
    position: absolute;
    bottom: 21px;
    right: 24px;
  }
`;

export const Breadcrumbs = styled.div`
  display: flex;
  padding: 10px 0;
  gap: 16px;
  margin: 32px 0;

  .button {
    cursor: pointer;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 425px) {
    width: 150%;}
`;

export const BlueBackgroundCard = styled.div`
  background: ${theme.colors.blue.shadow};
  border-radius: 8px;
`;

export const BlueFeatureCard = styled(BlueBackgroundCard)`
  padding: 12px 0;
  padding-left: 24px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;

  color: ${theme.colors.blue.border};
  font-family: Roboto;
  font-size: 16px;
  font-weight: 700;

  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const BlueFeatures = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 32px;
`;

export const DescriptionCard = styled(BlueBackgroundCard)`
  padding: 24px;
`;

export const DescriptionBox = styled(BlueBackgroundCard)`
  background: ${theme.colors.white.default};
  padding: 12px;
  margin-top: 12px;
`;

export const ReservationDetailsCard = styled(BlueBackgroundCard)`
  padding: 24px;
  display: flex;
  flex-direction: column;

  ${Title2} {
    margin-bottom: 24px;
  }

  ${Subtitle2} {
    margin-bottom: 10px;
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

export const Locations = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 6px;
`;

export const Location = styled.div`
  width: max(250px, 48%);
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  img {
    border-radius: 16px;
  }
`;

const FadeIn = keyframes`
  from {
    opacity: 0%;
  }
  to {
    opacity: 100%;
  }
`;

export const FullImageGallery = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 9999;

  animation: 0.1s linear 0s ${FadeIn};

  .background {
    position: fixed;
    background: rgba(229, 242, 255, 0.80);
    width: 100vw;
    height: 100vh;
    z-index: -10;
  }

  .images {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 160px 10vw;

    img {
      border-radius: 8px;
      height: auto;
      width: 100%;
    }

    .icon {
      position: absolute;
      margin-top: 26px;
      margin-left: 26px;

      display: inline-flex;
      padding: 4px;

      background: ${theme.colors.blue.light};
      border-radius: 4px;

      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

      cursor: pointer;

      transition: 0.2s ease;

      &:hover {
        filter: brightness(90%);
      }
    }
  }
`;