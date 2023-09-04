import api from "../api";

export async function getAllRecreationAreas(token){
    const requisition = await api.get(
        `/recreationArea/getAllRecreationAreas`,
        {headers: {
            authorization: token
        }}
    )
    return requisition;
}

export async function getApartament(token, urlRec){
    const requisition = await api.get(
        `/recreationArea/getRecreationArea/${urlRec}`,
        {headers: {
            authorization: token
        }}
    )
    return requisition;
}