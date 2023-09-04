import api from "../api";

export async function createRecreationArea(data, token){
    const requisition = await api.post(
        `/recreationArea/createRecreationArea`,
        data,
        {headers: {
            authorization: token
        }}
    )

    return requisition;
}

export async function getAllRecreationAreas(token){
    const requisition = await api.get(
        `/recreationArea/getAllRecreationAreas`,
        {headers: {
            authorization: token
        }}
    )
    return requisition;
}

export async function updateRecreationArea(token, data, urlApt){
    const requisition = await api.put(
        `/recreationArea/updateRecreationArea/${urlApt}`,
        data,
        {
            headers: {
                authorization: token
            }
        }
    )
    return requisition;
}


export async function getRecreationArea(token, urlRec){
    const requisition = await api.get(
        `/recreationArea/getRecreationArea/${urlRec}`,
        {headers: {
            authorization: token
        }}
    )
    return requisition;
}