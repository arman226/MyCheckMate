import { SET_SELECTED_SYMPTOMS } from './types'

const initialState = {
    userSelectedSymptoms: []
}

function applySetSelectedSymptoms(state, payload) {
    return {
        ...state,
        userSelectedSymptoms: payload
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_SYMPTOMS:
            return applySetSelectedSymptoms(state, action.payload)

        default:
            return state;

    }

}

export default reducer