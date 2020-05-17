import { SET_SELECTED_SYMPTOMS } from './types'

const setSelectedSymptoms = (selectedSymptoms) => {
    return {
        type: SET_SELECTED_SYMPTOMS,
        payload: selectedSymptoms
    }
}

export { setSelectedSymptoms }