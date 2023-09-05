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

export async function getReservations(token, urlRec){
    const requisition = await api.get(
        `/recreationArea/getReservations/${urlRec}`,
        {headers: {
            authorization: token
        }}
    )
    return requisition;
}

export async function createRecreationArea(data, token){
    return await api.post(
        `/recreationArea/createRecreationArea`,
        data,
        {headers: {
            authorization: token
        }}
    )
}

export async function updateRecreationArea(token, data, urlApt){
    return await api.put(
        `/recreationArea/updateRecreationArea/${urlApt}`,
        data,
        {
            headers: {
                authorization: token
            }
        }
    )
}