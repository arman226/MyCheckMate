import { CATEGORY } from '../config/API.constants'
import { apiGetRequest } from '../config/API.call'

export const getCategories = async () => {
    const response = await apiGetRequest(CATEGORY)
    return response
}