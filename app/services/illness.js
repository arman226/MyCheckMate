import { ILLNESS } from '../config/API.constants'
import { apiGetRequest } from '../config/API.call'

export const getIllnesses = async (data) => {
    const response = await apiGetRequest(ILLNESS + data)
    return response
}