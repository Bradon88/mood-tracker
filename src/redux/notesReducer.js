const initialState = {
    notes: []
}

const SET_NOTES = 'SET_NOTES'

export function setNotes(notes) {
    return {
        type: SET_NOTES,
        payload: notes
    }
}

export default function notesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_NOTES:
            return {
                ...state,
                notes: action.payload
            }
            default:
                return state
    }
}