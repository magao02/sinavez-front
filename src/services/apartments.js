import api from "../api";

export async function getAllApartments(token) {
    return await api.get(
        `/apartment/getAllApartments`,
        { headers: { authorization: token } }
    );
}

export async function getApartment(token, url) {
    return await api.get(
        `/apartment/getApartment/${url}`,
        { headers: { authorization: token } }
    );
}