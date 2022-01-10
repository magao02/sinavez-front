
import { Container, TableContainer, TableRow, LocationRow } from './styles'; 

const Table = (props) => (
  TableVariant(props)
);

function TableVariant({ title, headers, data, variant }) {
  switch(variant) {
    case 'pessoal': {
      return (
        <Container>
          <h1>{title}</h1>
          <TableContainer>
            <TableRow>
              <th>{headers[0]}</th>
              <td>{data[0]}</td>
            </TableRow>
            <TableRow>
              <th>{headers[1]}</th>
              <td>{data[1]}</td>
            </TableRow>
            <TableRow>
              <th>{headers[2]}</th>
              <td>{data[2]}</td>
            </TableRow>
            <TableRow>
              <th>{headers[3]}</th>
              <td>{data[3]}</td>
            </TableRow>
            <TableRow>
              <th>{headers[4]}</th>
              <td>{data[4]}</td>
            </TableRow>
            <TableRow>
              <th>{headers[5]}</th>
              <td>{data[5]}</td>
            </TableRow>
          </TableContainer>
        </Container>
      );
    }
    case 'trabalho': {
      return (<Container>
        <h1>{title}</h1>
        <TableContainer>
          <TableRow>
            <th>{headers[0]}</th>
            <td>{data[0]}</td>
          </TableRow>
          <TableRow>
            <th>{headers[1]}</th>
            <td>{data[1]}</td>
          </TableRow>
          <TableRow>
            <th>{headers[2]}</th>
            <td>{data[2]}</td>
          </TableRow>
        </TableContainer>
      </Container>)
    }
    case 'contato': {
      return (<Container>
        <h1>{title}</h1>
        <TableContainer>
          <TableRow>
            <th>{headers[0]}</th>
            <td>{data[0]}</td>
          </TableRow>
          <TableRow>
            <th>{headers[1]}</th>
            <td>{data[1]}</td>
          </TableRow>
          <TableRow>
            <th>{headers[2]}</th>
            <LocationRow>
              <td>{data[2]}</td>
              <div>
                <td>{data[3]}</td>
                <td>{data[4]}</td>
              </div>
              <td>{data[5]}</td>
            </LocationRow>
          </TableRow>
        </TableContainer>
      </Container>)
    }
  }
};

export default Table;