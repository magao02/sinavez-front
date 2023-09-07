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
    ))
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