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

export async function getReservations(token, urlApt){
    return await api.get(
        `/apartment/getReservations/${urlApt}`,
        {headers: {
            authorization: token
        }}
    )
}

export async function createApartament(data, token){
    return await api.post(
        `/apartment/createApartment`,
        data,
        {headers: {
            authorization: token
        }}
    )
}

export async function updateApartment(token, data, urlApt){
    return await api.put(
        `/apartment/updateApartment/${urlApt}`,
        data,
        {
            headers: {
                authorization: token
            }
        }
    )
}


export async function updatePayment(token, urlApt, reservaId, pagoValue){
    return await api.put(
        `/apartment/updatePayment/${urlApt}/${reservaId}`,
        {pago: pagoValue},
        {
            headers: {
                authorization: token
            }
        }
    )
}

export async function uploadPayment(token, urlApt, reservaId, files){
    const data = new FormData();
    for (let file of files) {
        data.append('file', file);
    }
    return await api.put(
        `/apartment/uploadPayment/${urlApt}/${reservaId}`,
        data,
        { headers: { authorization: token } }
    );
}