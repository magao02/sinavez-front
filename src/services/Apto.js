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