import * as types from '../../actions/types'

const INITIAL_STATE = { error: '', message: '', authenticated: false, user: { profile: {} } }

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.AUTH_USER:
            return {
                ...state,
                error: '',
                message: '',
                fullName: action.payload,
                authenticated: true
            }
        case types.UNAUTH_USER:
            return {
                ...state,
                authenticated: false
            }
        case types.AUTH_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case types.FETCH_USER_PROFILE:
            return {
                ...state,
                user: action.payload
            }
        default:
            return {
                ...state
            }
    }
}