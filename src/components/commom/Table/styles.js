import styled from "styled-components";
import theme from "../../../styles/theme";

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  gap: 3.2rem;
`;

export const TableContainer = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;

  tr:nth-child(even)  {
    background-color: rgba(184, 184, 184, 0.2);
  }
`;

export const TableRow = styled.tr`
  width: 100%;
  display: flex;

  th {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 1rem;

    font-weight: normal;

    border: 0.1rem solid black;
    border-radius: 0.4rem;
    
  }

  th::after {
    content: ":"
  }

  td {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 1rem;

    font-weight: bold;
    border: 0.1rem solid black;
    border-radius: 0.4rem;
  }
`;

export const LocationRow = styled.tr`
  width: 105%;
  display: flex;
  flex-direction: column;

  th {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 1rem;

    font-weight: normal;

    border: 0.1rem solid black;
    border-radius: 0.4rem;
    
  }

  th::after {
    content: ":"
  }

  td {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 1rem;

    font-weight: bold;
    border: 0.1rem solid black;
    border-radius: 0.4rem;
  }

  td {
    background-color: ${theme.colors.white};
  }
  
  div {
    width: 100%;
    display: flex;
  }
`;