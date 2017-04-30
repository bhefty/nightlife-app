export const REQUEST_BARS = 'REQUEST_BARS'
export const RECEIVE_BARS = 'RECEIVE_BARS'
export const SELECT_LOCATION = 'SELECT_LOCATION'
export const INVALIDATE_LOCATION = 'INVALIDATE_LOCATION'

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

const fetchBars = location => dispatch => {
    dispatch(requestBars(location))
    return fetch(`/yelp/${location}`)
        .then(response => response.json())
        .then(barsArray => {
            dispatch(receiveBars(location, barsArray))
        })
        .catch(err => console.log(err))
}

const shouldFetchBars = (state, location) => {
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