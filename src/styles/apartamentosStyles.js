import styled from "styled-components";
import theme from "./theme";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.blue.shadow};
  border-radius: 10px;
  padding: 26px;
  gap: 1.5em;
`;

export const Tabs = styled.div`
  display: flex;
`;

export const Tab = styled.span`
  --color: ${props => props.selected ? theme.colors.blue.heavy : theme.colors.gray.default};
  border-bottom: ${props => props.selected ? "2px" : "1px"} solid var(--color);

  color: var(--color);

  font-size: 1.1em;
  font-weight: 600;
  
  padding-bottom: 9px;
  flex-grow: 1;
  text-align: center;
  user-select: none;

  transition: 0.1s;

  &:hover {
    cursor: pointer;
    --color: #0f59a3;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 1em;
  
  & > .column {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

export const ColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Blue = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px;

  border-radius: 0px 0px 16px 16px;
  background: ${theme.colors.blue.background};
`;

export const SearchHelpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h1 {
    color: ${theme.colors.white.light};
    text-align: center;

    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
    margin-bottom: 10px;
  }

  & > p {
    color: #043F79;
    text-align: center;

    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    margin-bottom: 10px;
  }
`;

export const SearchHelp = styled.div`
  border-radius: 10px;
  border: 1px solid ${theme.colors.blue.shadow};
  color: ${theme.colors.white.light};
  max-width: 480px;
  padding: 16px;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;

  p {
    color: ${theme.colors.white.light};

    /* desktop.body2 */
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 125% */
  }

  .buttonContainer {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }

  .button {
    display: flex;
    align-items: center;
    padding: 4px 10px;
    gap: 8px;
    user-select: none;
    cursor: pointer;

    color: ${theme.colors.white.light};
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
  }
`;

export const NavSpacing = styled.div`
  height: 8.3vh; // copied from the Navigation's height
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 30px;
  @media(min-width: 1400px) {
    padding: 0 10vw;
  }
`;

export const Title = styled.h1`
  color: rgba(0, 0, 0, 0.80);
  margin-top: 16px;

  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
`;

export const BottomPadding = styled.div`
  height: 100px;
`;

export const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-top: 20px;

  h1 {
    color: ${theme.colors.gray.menu};
    text-align: center;

    font-size: 24px;
    font-weight: 600;
  }

  p {
    color: ${theme.colors.gray.menu};
    text-align: center;

    font-size: 18px;
    font-weight: 400;
    max-width: 505px;
  }
`;

export const NoMoreResults = styled.span`
  color: ${theme.colors.gray.default};
  font-size: 18px;
  font-weight: 400;

  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 3px;
  margin-top: 30px;
`;