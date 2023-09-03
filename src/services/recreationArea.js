import api from "../api";

export async function getAllRecreationAreas(token, data) {
    const qs = new URLSearchParams(data);
    return await api.get(
        `/recreationArea/getAllRecreationAreas?${qs}`,
        { headers: { authorization: token } }
    );
}

export async function getRecreationArea(token, url) {
    return await api.get(
        `/recreationArea/getRecreationArea/${url}`,
        { headers: { authorization: token } }
    );
}

export async function reserveRecreationArea(token, urlRec, urlUser, data) {
    return await api.post(
        `/recreationArea/reserveRecreationArea/${urlRec}/${urlUser}`,
        data,
        { headers: { authorization: token } }
    );
}