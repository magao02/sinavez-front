import api from "../api";

export async function getAllApartments(token) {
    return await api.get(
        `/apartment/getAllApartments`,
        { headers: { authorization: token } }
    );
}