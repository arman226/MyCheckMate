import { SYMPTOMS } from '../config/API.constants'
import { apiGetRequest } from '../config/API.call'

export const getSymptoms = async () => {
    const response = await apiGetRequest(SYMPTOMS)
    return response
}