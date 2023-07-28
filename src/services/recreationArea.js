import api from "../api";

export async function getAllRecreationAreas(token) {
    return await api.get(
        `/recreationArea/getAllRecreationAreas`,
        { headers: { authorization: token } }
    );
}