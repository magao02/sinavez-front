import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #C5DBF2;
  border-radius: 10px;
  padding: 26px;
  gap: 1.5em;
`;

export const Tabs = styled.div`
  display: flex;
`;

export const Tab = styled.span`
  --color: ${props => props.selected ? "#0760BA" : "#666"};
  border-bottom: ${props => props.selected ? "2px" : "1px"} solid var(--color);
  color: var(--color);
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
  background: var(--azul-1, #5D9BDA);
`;

export const SearchHelpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h1 {
    color: var(--text-invertido, #FDFDFD);
    text-align: center;

    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
    margin-bottom: 10px;
  }

  & > p {
    color: var(--azul-1, #043F79);
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
  border: 1px solid var(--azul-2, #C5DBF2);
  color: var(--text-invertido, #FDFDFD);
  max-width: 480px;
  padding: 16px;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    color: var(--text-invertido, #FDFDFD);

    /* desktop.body2 */
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 125% */
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

  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
`;