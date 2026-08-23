import api from "../api";

export async function addLivroCaixa(dados, token) {
  const data = new FormData();
  data.append('mes', dados.mes);
  data.append('ano', dados.ano);
  if (dados.file instanceof File) {
    data.append('file', dados.file);
  }
  const requisition = await api.post(
    `/livroCaixa/createLivroCaixa`,
    data,
    { headers: { authorization: token, 'Content-Type': 'multipart/form-data' } }
  );
  return requisition;
}

export async function getLivroCaixa(token) {
  const requisition = await api.get(
    `/livroCaixa/getLivroCaixa`,
    { headers: { authorization: token } }
  );
  return requisition;
}

export async function deleteLivroCaixa(id, token) {
  const requisition = await api.delete(
    `/livroCaixa/deleteLivroCaixa/${id}`,
    { headers: { authorization: token } }
  );
  return requisition;
}
