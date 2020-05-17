import { SET_SYMPTOMS } from './types'

const initialState = {
    symptoms: []
}
function applySetSymptoms(state, payload) {
    return {
        ...state,
        symptoms: payload

    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_SYMPTOMS:
            return applySetSymptoms(state, action.payload)

        default:
            return state
    }
}

export default reducer;