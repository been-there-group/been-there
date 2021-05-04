const initialState = {
    saved: [],
}

const SAVED_PLACES = 'SAVED_PLACES'


export function savedPlaces(payload){
    return {
        type: SAVED_PLACES,
        payload
    }
}


export default function reducer(state = initialState, action){
    const{ type, payload} = action
    switch(type){
        case SAVED_PLACES:
        return {
            ...state, 
            saved: payload
        }
        default:
            return state
    }
}