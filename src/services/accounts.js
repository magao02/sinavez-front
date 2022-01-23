import api from "../api";

export async function signUp(userValue) {
  const requisition = await api.post('/signUp', userValue);
  return requisition
}

export async function login(userValue) {
  const requisition = await api.post('/signIn', userValue);
  return requisition;
}

export async function getUserData(urlUser, token) {
  const requisition = await api.get('/user/' + urlUser, 
  { 'headers': {"authorization": token}});
  return requisition;
}