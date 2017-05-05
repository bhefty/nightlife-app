import { combineReducers } from 'redux'
import {
    SELECT_LOCATION, INVALIDATE_LOCATION,
    REQUEST_BARS, RECEIVE_BARS
} from '../../actions/yelp'

const selectedLocation = (state = '', action) => {
    switch (action.type) {
        case SELECT_LOCATION:
            return action.location
        default:
            return state
    }
}

const bars = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case INVALIDATE_LOCATION:
            return {
                ...state,
                didInvalidate: true
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

const barsByLocation = (state = { }, action) => {
    switch (action.type) {
        case INVALIDATE_LOCATION:
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

const rootReducer = combineReducers({
    barsByLocation,
    selectedLocation
})

export default rootReducer