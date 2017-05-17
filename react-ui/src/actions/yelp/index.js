export const REQUEST_BARS = 'REQUEST_BARS'
export const RECEIVE_BARS = 'RECEIVE_BARS'
export const REQUEST_NUM_ATTENDEES = 'REQUEST_NUM_ATTENDEES'
export const RECEIVE_NUM_ATTENDEES = 'RECEIVE_NUM_ATTENDEES'
export const SELECT_LOCATION = 'SELECT_LOCATION'
export const INVALIDATE_LOCATION = 'INVALIDATE_LOCATION'
export const REQUEST_BARS_FAILURE = 'REQUEST_BARS_FAILURE'
export const REQUEST_NUM_ATTENDEES_FAILURE = 'REQUEST_NUM_ATTENDEES_FAILURE'
export const REQUEST_INCREASE_NUM_ATTENDEES = 'REQUEST_INCREASE_NUM_ATTENDEES'
export const REQUEST_DECREASE_NUM_ATTENDEES = 'REQUEST_DECREASE_NUM_ATTENDEES'
export const RECEIVE_INCREASE_NUM_ATTENDEES = 'RECEIVE_INCREASE_NUM_ATTENDEES'
export const RECEIVE_DECREASE_NUM_ATTENDEES = 'RECEIVE_DECREASE_NUM_ATTENDEES'
export const REQUEST_INCREASE_NUM_ATTENDEES_FAILURE = 'REQUEST_INCREASE_NUM_ATTENDEES_FAILURE'
export const REQUEST_DECREASE_NUM_ATTENDEES_FAILURE = 'REQUEST_DECREASE_NUM_ATTENDEES_FAILURE'
export const REFRESHED_ATTENDEES = 'REFRESHED_ATTENDEES'

export const selectLocation = location => ({
    type: SELECT_LOCATION,
    location
})

export const invalidateLocation = location => ({
    type: INVALIDATE_LOCATION,
    location
})

export const refreshAttendees = location => ({
    type: REFRESHED_ATTENDEES,
    location
})

export const requestBars = location => ({
    type: REQUEST_BARS,
    location
})

export const receiveBars = (location, barsArray) => ({
    type: RECEIVE_BARS,
    location,
    bars: barsArray,
    receivedAt: Date.now()
})

export const requestNumAttendees = location => ({
    type: REQUEST_NUM_ATTENDEES,
    location
})

export const receiveNumAttendees = (location, attendeesArray) => ({
    type: RECEIVE_NUM_ATTENDEES,
    location,
    active: attendeesArray
})

export const requestIncreaseNumAttendees = id => ({
    type: REQUEST_INCREASE_NUM_ATTENDEES,
    id
})

export const requestDecreaseNumAttendees = id => ({
    type: REQUEST_DECREASE_NUM_ATTENDEES,
    id
})

export const receiveIncreaseNumAttendees = (id, attendeesArray) => ({
    type: RECEIVE_INCREASE_NUM_ATTENDEES,
    id,
    active: attendeesArray
})

export const receiveDecreaseNumAttendees = (id, attendeesArray) => ({
    type: RECEIVE_DECREASE_NUM_ATTENDEES,
    id,
    active: attendeesArray
})

export const putIncreaseNumAttendees = (bar_id, user_id) => dispatch => {
    console.log('user', user_id)
    dispatch(requestIncreaseNumAttendees(bar_id))
    return fetch(`/api/bars/inc/${bar_id}`, {method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({user_id}) })
        .then(response => response.json())
        .then(attendeesArray => {
            dispatch(receiveIncreaseNumAttendees(bar_id, attendeesArray))
        })
        .catch(() => {
            dispatch({ type: REQUEST_INCREASE_NUM_ATTENDEES_FAILURE})
        })
}

export const putDecreaseNumAttendees = (bar_id, user_id) => dispatch => {
    dispatch(requestDecreaseNumAttendees(bar_id))
    return fetch(`/api/bars/dec/${bar_id}`, {method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({user_id}) })
        .then(response => response.json())
        .then(attendeesArray => {
            dispatch(receiveDecreaseNumAttendees(bar_id, attendeesArray))
        })
        .catch(() => {
            dispatch({ type: REQUEST_DECREASE_NUM_ATTENDEES_FAILURE})
        })
}

export const fetchBars = location => dispatch => {
    dispatch(requestBars(location))
    return fetch(`/api/yelp/${location}`)
        .then(response => response.json())
        .then(barsArray => {
            dispatch(receiveBars(location, barsArray))
        })
        .catch(() => {
            console.log('error on yelp location?')
            dispatch({ type: REQUEST_BARS_FAILURE })
        })
}

export const fetchNumAttendees = location => dispatch => {
    dispatch(requestNumAttendees(location))
    return fetch('/api/bars/')
        .then(response => response.json())
        .then(attendeesArray => {
            dispatch(receiveNumAttendees(location, attendeesArray))
            dispatch(refreshAttendees(location))
        })
        .catch(() => {
            dispatch({ type: REQUEST_NUM_ATTENDEES_FAILURE })
        })
}

export const shouldFetchBars = (state, location) => {
    const bars = state.barsByLocation[location]
    if (!bars) {
        return true
    }
    if (bars.isFetching) {
        return false
    }
    return bars.didInvalidate
}

export const fetchBarsIfNeeded = location => (dispatch, getState) => {
    if (shouldFetchBars(getState(), location)) {
        return dispatch(fetchBars(location))
    }
}