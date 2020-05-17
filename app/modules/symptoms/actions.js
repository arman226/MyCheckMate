import { SET_SYMPTOMS } from './types'

const setSymptoms = (symp) => {
    return {
        type: SET_SYMPTOMS,
        payload: symp

    }
}

export { setSymptoms }