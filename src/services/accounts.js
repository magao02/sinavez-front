import api from "../api";

export async function signUp(userValue) {
  const requisition = await api.post("/signUp", userValue);
  return requisition;
}

export async function login(userValue) {
  const requisition = await api.post("/signIn", userValue);
  return requisition;
}

export async function getUserData(urlUser, token) {
  const requisition = await api.get("/user/" + urlUser, {
    headers: { authorization: token },
  });
  return requisition;
}

export async function addDependent(dependentData, urlUser, token) {
  const requisition = await api.post(
    "/user/" + urlUser + "/signUpDep",
    dependentData,
    { headers: { authorization: token } }
  );
  return requisition;
}

export async function removeDependent(token, dependentUrl) {
  const requisition = await api.delete(
    "/deleteDep/" + dependentUrl,
    { headers : {authorization: token }}
  );
  return requisition;
}

export async function getDependents(urlUser, token) {
  const requisition = await api.get("/getDependents/" + urlUser, {
    headers: { authorization: token },
  });
  return requisition;
}

export async function getAssociados(token) {
  const requisition = await api.get("/getUsers/", {
    headers: { authorization: token },
  });
  return requisition;
}

export async function setImpostoAssociado(urlUser, imposto, token) {
  console.log(imposto);
  const requisition = await api.put(
    "/user/" + urlUser + "/setImpostoDeRenda",
    imposto, 
    {headers: { authorization: token }});
    return requisition;
}

export async function setImpostoDependente(urlUser, depUrl, imposto, token) {
  console.log(imposto);
  const requisition = await api.put(
    "/user/" + urlUser + "/setImpostoDeRendaDep/" + depUrl,
    imposto, 
    {headers: { authorization: token }});
    return requisition;
}

export async function getImpostos(urlUser, token) {
  const requisition = await api.get(
    "getPDF/" + urlUser,
    {headers: { authorization: token }});
    return requisition;
}

export async function logout(token) {
  const requisition = await api.get("/signOut", {
    headers: { authorization: token },
  });
  return requisition;
}
