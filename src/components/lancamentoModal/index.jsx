import React, { useRef, useState } from 'react';
import styles from './style.module.css'
import Button from "../../components/commom/Button"
import { SearchInput } from "../SearchInputs";
import Input from "../../components/commom/Input";
export const Modal = ({ onClose, handleSave }) => {
  const nameRef = useRef(null);
  const valorRef = useRef(null);
  const [tipo, setTipo] = useState('recebimento');
  const [data, setData] = useState('');
  const [file, setFile] = useState(null);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  }
  const handleTipoChange = (e) => {
    console.log(e.target.value);
    setTipo(e.target.value);
  }
  const teste = (e) => {
    console.log(e.target.value);
    setData(e.target.value);
  }
  function parseCurrencyToFloat(value) {
  if (!value) return 0;

  // Remove o símbolo da moeda, os pontos de milhar e substitui a vírgula pelo ponto decimal
  const numericValue = value
    .replace(/[^\d,-]/g, "") // Remove caracteres não numéricos (exceto vírgula e hífen)
    .replace(",", "."); // Substitui vírgula por ponto

  // Converte para float e limita a 2 casas decimais
  return parseFloat(numericValue).toFixed(2);
}
  const onSave = () => {
    const valor = parseCurrencyToFloat(valorRef.current.value);
    let urlComprovante = ''
    if (file == null) { 
      urlComprovante= ''
    } else {
      urlComprovante = file
    }
    const dados = {
      descricao: nameRef.current.value,
      valor: valor,
      tipo: tipo,
      data: data,
      urlComprovante: file
    }


    handleSave(dados);
  }

  const getFile = ( event ) => {
    const file = event.target.files[0]
    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        
      }
    }

    setFile(file)
    reader.readAsDataURL(file)
  }


  return (
    <div className={styles.modalOverlay}>
            {/* Wrap the whole Modal inside the newly created StyledModalWrapper
            and use the ref */}
            <div className={styles.modalWrapper}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                  {<h3> Novo lançamento</h3>}
          <div className={styles.modalBody}>
            <form>
              <div className={styles.inputBox}>
                <Input
              variant="default"
              label={"Descrição"}
              name={"descricao"}
              placeholder={"Digite a descrição"}
              ref={nameRef}
                  initialValue={''}
                  
              
            />
                 
              </div>
              <div className={styles.inputBox}>
                <Input
              variant="default-optional"
              label={"Valor"}
              name={"valorLancamento"}
              placeholder={"R$ 00,00"}
                  initialValue={''}
            
              ref={valorRef}
              
            />         
              </div>
              <div >
                <SearchInput label="Data" type="date" innerLabel="Data"  initialValue={'12/11/2024'} onChange={teste}/>
                      
              </div>
              <div>
                <label htmlFor="data">Tipo:</label>
                <div className={styles.selectContainer}>
                  <select className={styles.styledSelect} onChange={handleTipoChange}>
        <option value="recebimento">Recebimento</option>
        <option value="despesa">Despesa</option>
      </select>
    </div>       
              </div>
              <div>
                <label htmlFor="file">Comprovante:</label>
                <input type="file" name="file" accept="image/jpg, image/jpeg ,image/png, application/pdf" onChange={(e) => getFile(e)} />
              </div>

            </form>
            <Button variant='editButton' onClick={onSave}> Cadastrar lançamento</Button>
                </div>
            </div>
      </div>
    </div>
      );
      
};
