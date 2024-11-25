import api from "../api";
import { handleUnauthorized } from "../utils/loginCheck";

export async function getAllApartments(token, data) {
    const qs = new URLSearchParams(data);
    return await handleUnauthorized(api.get(
        `/apartment/getAllApartments?${qs}`,
        { headers: { authorization: token } }
    ));
}

export async function getApartment(token, url) {
    return await handleUnauthorized(api.get(
        `/apartment/getApartment/${url}`,
        { headers: { authorization: token } }
    ));
}

export async function reserveApartment(token, urlApt, urlUser, data) {
    return await handleUnauthorized(api.post(
        `/apartment/reserveApartment/${urlApt}/${urlUser}`,
        data,
        { headers: { authorization: token } }
    ));
}

export async function getReservations(token, urlApt){
    return await handleUnauthorized(api.get(
        `/apartment/getReservations/${urlApt}`,
        {headers: {
            authorization: token
        }}
    ));
}

export async function getReservationsByUser(token, urlUser) {
    const apartments = await handleUnauthorized(api.get(
        `/apartment/getReservationsByUser/${urlUser}`,
        {headers: {
            authorization: token
        }}
    ));
    return apartments.data;
}

export async function cancelReservation(token, urlApt, urlReserva) {
    console.log(urlApt, urlReserva);
    const retorn = await api.delete(
        `/apartment/cancelReservation/${urlApt}/${urlReserva}`,
        { headers: { authorization: token } }
    );
    console.log(retorn);
    return retorn;
 }


export async function createApartament(data, token){
    return await handleUnauthorized(api.post(
        `/apartment/createApartment`,
        data,
        {headers: {
            authorization: token
        }}
    ));
}

export async function updateApartment(token, data, urlApt){
    return await handleUnauthorized(api.put(
        `/apartment/updateApartment/${urlApt}`,
        data,
        {
            headers: {
                authorization: token
            }
        }
    ));
}

export async function deleteApartment(token, urlApt){
    return await api.delete(
        `/apartment/deleteApartment/${urlApt}`,
        {
            headers: { authorization: token },
        }
    );
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
    );
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

export async function setApartmentPhotos(files, urlApt, token) {
    const data = new FormData();
    for (let file of files) {
        data.append('photos', file);
    }
    return await api.put(
        `/apartment/setApartmentPhotos/${urlApt}`,
        data,
        { headers: { authorization: token } }
    );
}