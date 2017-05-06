export const REQUEST_BARS = 'REQUEST_BARS'
export const RECEIVE_BARS = 'RECEIVE_BARS'
export const REQUEST_NUM_ATTENDEES = 'REQUEST_NUM_ATTENDEES'
export const RECEIVE_NUM_ATTENDEES = 'RECEIVE_NUM_ATTENDEES'
export const SELECT_LOCATION = 'SELECT_LOCATION'
export const INVALIDATE_LOCATION = 'INVALIDATE_LOCATION'
export const REQUEST_BARS_FAILURE = 'REQUEST_BARS_FAILURE'
export const REQUEST_NUM_ATTENDEES_FAILURE = 'REQUEST_NUM_ATTENDEES_FAILURE'

export const selectLocation = location => ({
    type: SELECT_LOCATION,
    location
})

export const invalidateLocation = location => ({
    type: INVALIDATE_LOCATION,
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

export const fetchBars = location => dispatch => {
    dispatch(requestBars(location))
    return fetch(`/yelp/${location}`)
        .then(response => response.json())
        .then(barsArray => {
            dispatch(receiveBars(location, barsArray))
        })
        .catch(() => {
            dispatch({ type: REQUEST_BARS_FAILURE })
        })
}

export const fetchNumAttendees = location => dispatch => {
    dispatch(requestNumAttendees(location))
    return fetch('/bars/')
        .then(response => response.json())
        .then(attendeesArray => {
            dispatch(receiveNumAttendees(location, attendeesArray))
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