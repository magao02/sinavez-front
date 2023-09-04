import api from "../api";

export async function createApartament(data, token){
    const requisition = await api.post(
        `/apartment/createApartment`,
        data,
        {headers: {
            authorization: token
        }}
    )

    return requisition;
}

export async function getAllApartaments(token){
    const requisition = await api.get(
        `/apartment/getAllApartments`,
        {headers: {
            authorization: token
        }}
    )
    return requisition;
}

export async function updateApartment(token, data, urlApt){
    const requisition = await api.put(
        `/apartment/updateApartment/${urlApt}`,
        data,
        {
            headers: {
                authorization: token
            }
        }
    )
    return requisition
}


export async function getApartament(token, urlApt){
    const requisition = await api.get(
        `/apartment/getApartment/${urlApt}`,
        {headers: {
            authorization: token
        }}
    )
    return requisition;
}