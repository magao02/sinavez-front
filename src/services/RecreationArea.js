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