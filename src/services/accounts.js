import api from "../api";
import { handleUnauthorized } from "../utils/loginCheck";

//Depedentes Routes:

export async function addDependent(dependentData, urlUser, token) {
    const requisition = await api.post(
        `/dependente/signUpDep/${urlUser}`,
        dependentData,
        { headers: { authorization: token } }
    );
    return requisition;
}

export async function getDependents(urlUser, token) {
    const requisition = await api.get(
        `/dependente/getDependents/${urlUser}`, {
        headers: { authorization: token },
    });
    return requisition;
}

export async function removeDependent(token, dependentUrl) {
    const requisition = await api.delete(
        `/dependente/deleteDep/${dependentUrl}`, {
        headers: { authorization: token },
    });
    return requisition;
}

export async function updateDependent(data, dependentUrl, token) {
    const requisition = await api.put(
        `/dependente/updateDep/${dependentUrl}`,
        data,
        { headers: { authorization: token } }
    );
    return requisition;
}

//Home Page Routes:

export async function signUp(userValue) {
    const requisition = await api.post(
        "/signUp", userValue);
    return requisition;
}

export async function login(userValue) {
    const requisition = await api.post(
        "/signIn", userValue);
    return requisition;
}

export async function logout(token) {
    const requisition = await api.get(
        "/signOut", {
        headers: { authorization: token },
    });
    return requisition;
}

export async function passwordToken(email) {
    const requisition = await api.get(
        `/passwordToken/${email}`);
    return requisition;
}

export async function setNewPassword(email, token, password) {
    const requisition = await api.put(
        `/setNewPassword/${email}/${token}`,
        { password: password }
    );
    return requisition;
}

//Imposto Routes:

export async function setImpostoAssociado(urlUser, imposto, ano, token) {
    const requisition = await api.put(
        `/imposto/setImpostoDeRenda/${urlUser}/${ano}`,
        imposto,
        { headers: { authorization: token } }
    );
    return requisition;
}

export async function setImpostoDependente(urlUser, depUrl, imposto, ano, token) {
    const requisition = await api.put(
        `/imposto/setImpostoDeRendaDep/${urlUser}/${depUrl}/${ano}`,
        imposto,
        { headers: { authorization: token } }
    );
    return requisition;
}

export async function createNewImpostoByYearAssociado(urlUser, ano, token) {
    const requisition = await api.post(
        `/imposto/createNewImpostoByYearUser/${urlUser}/${ano}`, {},
        { headers: { authorization: token } });
    return requisition;
}

export async function createNewImpostoByYearDep(urlUser, ano, urlDep, token) {
    const requisition = await api.post(
        `/imposto/createNewImpostoByYearDep/${urlUser}/${urlDep}/${ano}`, {},
        { headers: { authorization: token } });
    return requisition;
}

//User Routes:

export async function incompleteDataUser(userValue, token) {
    const requisition = await api.post(
        "/user/createIncompleteUser", userValue, {
        headers: { authorization: token },
    });
    return requisition;
}

export async function getUserData(urlUser, token) {
    const requisition = await handleUnauthorized(api.get(
        `/user/getUser/${urlUser}`, {
        headers: { authorization: token },
    }));
    return requisition;
}

export async function getImpostos(urlUser, token, year) {
    const requisition = await api.get(
        `/user/getPDF/${urlUser}/${year}`, {
        headers: { authorization: token },
    });
    return requisition;
}

export async function getYears(urlUser, token) {
    const requisition = await api.get(
        "/user/getUserYears/" + urlUser, {
        headers: { authorization: token },
    });
    return requisition;
}

export async function getAssociados(token) {
    const requisition = await handleUnauthorized(api.get(
        "/user/getUsers", {
        headers: { authorization: token },
    }));
    return requisition;
}

export async function setPassword(newPassword, token) {
    const requisition = await api.put(
        "/user/setPassword", newPassword, {
        headers: { authorization: token },
    });
    return requisition;
}

export async function setData(urlUser, newData, token) {
    const requisition = await api.put(
        `/user/setPerfil/${urlUser}`, newData, {
        headers: { authorization: token },
    });
    return requisition;
}

export async function setUserData(urlUser, newData, token) {
    const requisition = await api.put(
        `/user/setUser/${urlUser}`, newData, {
        headers: { authorization: token },
    });
    return requisition;
}

export async function setAdmin(urlUser, token) {
    const requisition = await api.put(
        `/user/setNewAdmin/${urlUser}`, {}, {
        headers: { authorization: token },
    });
    return requisition;
}

export async function removeUser(userUrl, token) {
    const requisition = await api.delete(
        `/user/deleteUser/${userUrl}`, {
        headers: { authorization: token },
    });
    return requisition;
}

export async function setPhoto(file, urlUser, token) {
    const data = new FormData();
    data.append('photo', file);
    return await api.post(
        `/user/setPhoto/${urlUser}`,
        data,
        { headers: { authorization: token } }
    );
}
