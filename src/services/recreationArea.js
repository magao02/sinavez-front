import api from "../api";
import { handleUnauthorized } from "../utils/loginCheck";

export async function getAllRecreationAreas(token, data) {
    const qs = new URLSearchParams(data);
    return await api.get(
        `/recreationArea/getAllRecreationAreas?${qs}`,
        { headers: { authorization: token } }
    );
}

export async function getRecreationArea(token, url) {
    return await handleUnauthorized(api.get(
        `/recreationArea/getRecreationArea/${url}`,
        { headers: { authorization: token } }
    ));
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
    );
}

export async function updatePayment(token, urlApt, reservaId, pagoValue) {
    return await api.put(
        `/recreationArea/updatePayment/${urlApt}/${reservaId}`,
        {pago: pagoValue},
        { headers: { authorization: token } }
    );
}

export async function uploadPayment(token, urlApt, reservaId, files){
    const data = new FormData();
    for (let file of files) {
        data.append('file', file);
    }
    return await api.put(
        `/recreationArea/uploadPayment/${urlApt}/${reservaId}`,
        data,
        { headers: { authorization: token } }
    );
}

export async function deletePayment(token, urlApt, reservaId, url){
    return await api.delete(
        `/apartment/deletePayment/${urlApt}/${reservaId}`,
        {
            headers: { authorization: token },
            data: {
                url: url
            }
        }
    );
}

export async function setRecreationAreaPhotos(files, urlApt, token) {
    const data = new FormData();
    for (let file of files) {
        data.append('photos', file);
    }
    return await api.put(
        `/recreationArea/setRecreationAreaPhotos/${urlApt}`,
        data,
        { headers: { authorization: token } }
    );
}