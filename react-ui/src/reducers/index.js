import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth'
import { barsByLocation, selectedLocation } from './yelp'

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    barsByLocation,
    selectedLocation
})

export default rootReducer