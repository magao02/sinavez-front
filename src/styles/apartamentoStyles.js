import styled from "styled-components";
import theme from "./theme";

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
`;

export const Title1 = styled.h1`
  color: ${theme.colors.gray.menu};

  font-family: Jost;
  font-size: 32px;
  font-weight: 700;
`;

export const Title2 = styled.h2`
  color: ${theme.colors.gray.menu};

  font-family: Jost;
  font-size: 24px;
  font-weight: 600;
`;

export const Subtitle1 = styled.h3`
  color: ${theme.colors.gray.menu};

  font-family: Jost;
  font-size: 22px;
  font-weight: 600;
`;

export const Subtitle2 = styled.h4`
  color: ${theme.colors.gray.menu};

  font-family: Jost;
  font-size: 18px;
  font-weight: 500;
`;

export const Body1 = styled.span`
  color: ${props => props.primary ? theme.colors.gray.menu : theme.colors.gray.default};

  font-family: Roboto;
  font-size: 18px;
  font-weight: 400;
`;

export const Body2 = styled.span`
  color: ${props => props.primary ? theme.colors.gray.menu : theme.colors.gray.default};

  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
`;

export const Body3 = styled.span`
  color: ${props => props.primary ? theme.colors.gray.menu : theme.colors.gray.default};

  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
`;

export const Images = styled.div`
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
`;

export const BlueOutlineCard = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  gap: 10px;

  border-radius: 8px;
  border: 1px solid ${theme.colors.blue.lighter};
  background: ${theme.colors.white.default};

  // silly
  max-width: 820px;
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
  width: 247px;
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
`;

export const Breadcrumbs = styled.div`
  display: flex;
  padding: 10px 0;
  gap: 16px;
  margin: 32px 0;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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

  h2 {
    margin-bottom: 24px;
  }

  .row {
    display: flex;
    gap: 16px;
    justify-content: space-between;
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
`;