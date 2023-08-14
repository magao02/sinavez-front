import api from "../api";

export async function getAllRecreationAreas(token) {
    return await api.get(
        `/recreationArea/getAllRecreationAreas`,
        { headers: { authorization: token } }
    );
}

export async function getRecreationArea(token, url) {
    return await api.get(
        `/recreationArea/getRecreationArea/${url}`,
        { headers: { authorization: token } }
    );
}