import api from "../api";

export async function getAllApartments(token, data) {
    const qs = new URLSearchParams(data);
    return await api.get(
        `/apartment/getAllApartments?${qs}`,
        { headers: { authorization: token } }
    );
}

export async function getApartment(token, url) {
    return await api.get(
        `/apartment/getApartment/${url}`,
        { headers: { authorization: token } }
    );
}

export async function reserveApartment(token, urlApt, urlUser, data) {
    return await api.post(
        `/apartment/reserveApartment/${urlApt}/${urlUser}`,
        data,
        { headers: { authorization: token } }
    );
}