import api from "../api";
import { handleUnauthorized } from "../utils/loginCheck";

export async function addLanCamento(dados, token) {
  const data = new FormData();
  data.append('descricao', dados.descricao);
  data.append('valor', dados.valor);
  data.append('tipo', dados.tipo);
  data.append('data', dados.data);
   if (dados.urlComprovante instanceof File) {
    data.append('file', dados.urlComprovante);
  }
    const requisition = await api.post(
        `/lancamentos/createLancamento`,
        data,
        { headers: { authorization: token, 'Content-Type': 'multipart/form-data'  },  }
    );
    return requisition;
}

export async function getLancamentos(token) {
    const requisition = await api.get(
        `/lancamentos/getLancamentos`, {
        headers: { authorization: token },
    });
    return requisition;
}

export async function deleteLancamento(id, token) {
    const requisition = await api.delete(
        `/lancamentos/deleteLancamento/${id}`,
        { headers: { authorization: token }, }
    );
    return requisition;
}
