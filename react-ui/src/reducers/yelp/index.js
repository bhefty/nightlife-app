// import { combineReducers } from 'redux'
import {
    SELECT_LOCATION, INVALIDATE_LOCATION,
    REQUEST_BARS, RECEIVE_BARS,
    REQUEST_NUM_ATTENDEES, RECEIVE_NUM_ATTENDEES,
    REQUEST_INCREASE_NUM_ATTENDEES, REQUEST_DECREASE_NUM_ATTENDEES,
    RECEIVE_INCREASE_NUM_ATTENDEES, RECEIVE_DECREASE_NUM_ATTENDEES
} from '../../actions/yelp'

export const selectedLocation = (state = '', action) => {
    switch (action.type) {
        case SELECT_LOCATION:
            return action.location
        default:
            return state
    }
}

export const bars = (state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    activeBars: []
}, action) => {
    switch (action.type) {
        case INVALIDATE_LOCATION:
            return {
                ...state,
                didInvalidate: true
            }
        case REQUEST_NUM_ATTENDEES:
        case REQUEST_INCREASE_NUM_ATTENDEES:
        case REQUEST_DECREASE_NUM_ATTENDEES:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_NUM_ATTENDEES:
        case RECEIVE_INCREASE_NUM_ATTENDEES:
        case RECEIVE_DECREASE_NUM_ATTENDEES:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                activeBars: action.active
            }
        case REQUEST_BARS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_BARS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.bars,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

export const barsByLocation = (state = { }, action) => {
    switch (action.type) {
        case INVALIDATE_LOCATION:
        case RECEIVE_NUM_ATTENDEES:
        case REQUEST_NUM_ATTENDEES:
        case RECEIVE_BARS:
        case REQUEST_BARS:
            return {
                ...state,
                [action.location]: bars(state[action.location], action)
            }
        default:
            return state
    }
}

// const rootReducer = combineReducers({
//     barsByLocation,
//     selectedLocation
// })

// export default rootReducer