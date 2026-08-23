import React, { useState } from 'react';
import styles from './style.module.css';
import Button from "../commom/Button";

const MESES = [
  { value: '1', label: 'Janeiro' },
  { value: '2', label: 'Fevereiro' },
  { value: '3', label: 'Março' },
  { value: '4', label: 'Abril' },
  { value: '5', label: 'Maio' },
  { value: '6', label: 'Junho' },
  { value: '7', label: 'Julho' },
  { value: '8', label: 'Agosto' },
  { value: '9', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' },
];

export const LivroCaixaModal = ({ onClose, handleSave }) => {
  const currentDate = new Date();
  const [mes, setMes] = useState(String(currentDate.getMonth() + 1));
  const [ano, setAno] = useState(String(currentDate.getFullYear()));
  const [file, setFile] = useState(null);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const getFile = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const onSave = () => {
    const dados = {
      mes,
      ano,
      file,
    };
    handleSave(dados);
  };

  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <a href="#" onClick={handleCloseClick}>x</a>
          </div>
          <h3>Novo Livro Caixa</h3>
          <div className={styles.modalBody}>
            <form>
              <div>
                <label>Mês:</label>
                <div className={styles.selectContainer}>
                  <select
                    className={styles.styledSelect}
                    value={mes}
                    onChange={(e) => setMes(e.target.value)}
                  >
                    {MESES.map((m) => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label>Ano:</label>
                <div className={styles.selectContainer}>
                  <select
                    className={styles.styledSelect}
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                  >
                    {years.map((y) => (
                      <option key={y} value={String(y)}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="file">Arquivo:</label>
                <input
                  type="file"
                  name="file"
                  accept="image/jpg, image/jpeg, image/png, application/pdf"
                  onChange={(e) => getFile(e)}
                  style={{ marginTop: '8px', display: 'block' }}
                />
              </div>
            </form>
            <Button variant="editButton" onClick={onSave} style={{ marginTop: '20px' }}>
              Cadastrar Livro Caixa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
