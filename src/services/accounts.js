import api from "../api";

export async function signUp(userValue) {
  const requisition = await api.post('/signUp', userValue);
  return requisition
}