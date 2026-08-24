import { useAuth } from "../../contexts/AuthContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { Content, NavSpacing } from "../../styles/apartamentosStyles";
import Button from "../../components/commom/Button";
import Navigation from "../../components/commom/Nav";
import { LivroCaixaModal } from "../../components/livroCaixaModal";
import { addLivroCaixa, getLivroCaixa, deleteLivroCaixa } from "../../services/livroCaixa";
import { useEffect, useState } from "react";
import styles from './style.module.css';

const MESES = [
  '', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const cellStyle = {
  padding: '15px 20px',
  border: 'none',
  lineHeight: '1.8',
};

const LivroCaixaPage = () => {
  const [livroCaixas, setLivroCaixas] = useState([]);
  const [livroCaixasFiltro, setLivroCaixasFiltro] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const currentDate = new Date();
  const [anoFiltro, setAnoFiltro] = useState(String(currentDate.getFullYear()));

  const authContext = useAuth();
  const isAdmin = authContext?.admin === true || authContext?.admin === 'true';

  useEffect(() => {
    fetchLivroCaixas();
  }, []);

  useEffect(() => {
    filterLivroCaixas();
  }, [anoFiltro, livroCaixas]);

  const fetchLivroCaixas = async () => {
    const req = await getLivroCaixa(authContext.token);
    if (req.status === 200) {
      setLivroCaixas(req.data);
    }
  };

  const filterLivroCaixas = () => {
    const filtrados = livroCaixas.filter((item) => {
      const anoValido = anoFiltro === '' || String(item.ano) === anoFiltro;
      return anoValido;
    });
    setLivroCaixasFiltro(filtrados);
  };

  const handleSave = async (dados) => {
    if (!isAdmin) {
      return;
    }

    const req = await addLivroCaixa(dados, authContext.token);
    if (req.status === 200) {
      fetchLivroCaixas();
    }
    setIsOpen(false);
  };

  const handleDelete = async (item) => {
    if (!isAdmin) {
      return;
    }

    const req = await deleteLivroCaixa(item._id, authContext.token);
    if (req.status === 200) {
      fetchLivroCaixas();
    }
  };

  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div>
      <Navigation selectedPage="livroCaixa" variant={authContext?.admin ? "admin" : "logged"} />
      <NavSpacing />
      <Content>
        <div className={styles.lancamentoHeader}>
          <h2>Livro Caixa</h2>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div>
              <label style={{ marginRight: '6px' }}>Ano:</label>
              <select
                className={styles.styledSelect}
                value={anoFiltro}
                onChange={(e) => setAnoFiltro(e.target.value)}
              >
                <option value="">Todos</option>
                {years.map((y) => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          {isAdmin && (
            <Button variant="editButton" onClick={() => setIsOpen(true)}>Novo Livro Caixa</Button>
          )}
        </div>

        <table className={styles.tableClass} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'hsl(240 4.76% 95.88%)' }}>
            <tr>
              <th style={{ padding: '10px' }}>Mês</th>
              <th style={{ padding: '10px' }}>Ano</th>
              <th style={{ padding: '10px' }}>Tipo</th>
              <th style={{ padding: '10px' }}>Arquivo</th>
              {isAdmin && <th style={{ padding: '10px' }}></th>}
            </tr>
          </thead>
          <tbody>
            {livroCaixasFiltro.map((item, index) => (
              <tr key={index}>
                <td style={{ ...cellStyle }}>{MESES[Number(item.mes)] || item.mes}</td>
                <td style={{ ...cellStyle }}>{item.ano}</td>
                <td style={{ ...cellStyle }}>{item.tipo || '-'}</td>
                <td style={{ ...cellStyle }}>
                  {(item.urlImagem || item.url) ? (
                    <a href={item.urlImagem || item.url} target="_blank" rel="noreferrer">Baixar arquivo</a>
                  ) : (
                    'Sem arquivo'
                  )}
                </td>
                {isAdmin && (
                  <td>
                    <FaRegTrashAlt
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => handleDelete(item)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {isAdmin && isOpen && (
          <LivroCaixaModal onClose={() => setIsOpen(false)} handleSave={handleSave} />
        )}
      </Content>
    </div>
  );
};

export default LivroCaixaPage;
