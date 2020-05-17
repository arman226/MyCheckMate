import { API } from './API.constants'

export const apiGetRequest = async (endpoint) => {
    const response = await fetch(API + endpoint)
    const responseJson = await response.json()
    return responseJson
}