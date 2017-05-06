import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from '../index'
import { 
    REQUEST_BARS, RECEIVE_BARS, REQUEST_BARS_FAILURE,
    REQUEST_NUM_ATTENDEES, RECEIVE_NUM_ATTENDEES, REQUEST_NUM_ATTENDEES_FAILURE, 
    SELECT_LOCATION, INVALIDATE_LOCATION 
} from '../index'

const mockStore = configureMockStore([thunk])
Date.now = jest.fn(() => 1493947561218)

describe('Yelp sync actions', () => {
    it('should create an action to select a location', () => {
        const location = 'Toronto'
        const expectedAction = {
            type: SELECT_LOCATION,
            location
        }

        expect(actions.selectLocation(location)).toEqual(expectedAction)
    })

    it('should create an action to invalidate a location', () => {
        const location = 'NYC'
        const expectedAction = {
            type: INVALIDATE_LOCATION,
            location
        }

        expect(actions.invalidateLocation(location)).toEqual(expectedAction)
    })

    it('should create an action to request bars for a location', () => {
        const location = 'NYC'
        const expectedAction = {
            type: REQUEST_BARS,
            location
        }

        expect(actions.requestBars(location)).toEqual(expectedAction)
    })

    it('should create an action to receive bars for a location', () => {
        const location = 'Nashville'
        const bars = [{ name: 'Dragon Den'}, { name: 'Snake Hole Lounge' }]

        const expectedAction = {
            type: RECEIVE_BARS,
            location,
            bars,
            receivedAt: Date.now()
        }

        expect(actions.receiveBars(location, bars)).toEqual(expectedAction)
    })

    describe('shouldFetchBars', () => {
        it('should handle shouldFetchBars if there are no bars in state', () => {
            const location = 'Austin'
            const state = { 
                barsByLocation: {
                    location
                } 
            }

            const expectedAction = true
            expect(actions.shouldFetchBars(state, location)).toEqual(expectedAction)
        })

        it('should handle shouldFetchBars if there are bars in state, but is currently fetching', () => {
            const location = 'Austin'
            const state = { 
                barsByLocation: {
                    [location]: {
                        isFetching: true
                    }
                }
            }

            const expectedAction = false
            expect(actions.shouldFetchBars(state, location)).toEqual(expectedAction)
        })

        it('should handle shouldFetchBars if there are bars in state, not fetching', () => {
            const location = 'Austin'
            const state = { 
                barsByLocation: {
                    [location]: {
                        didInvalidate: true,
                        isFetching: false
                    }
                }
            }

            const expectedAction = true
            expect(actions.shouldFetchBars(state, location)).toEqual(expectedAction)
        })
    })

    describe('fetchBarsIfNeeded', () => {
        it('should dispatch fetchBars if shouldFetchBars is true', () => {
            const location = 'Dallas'
            const state = {
                barsByLocation: {
                    selectedLocation: location
                }
            }

            const fetchBarsMock = jest.fn()

            expect(typeof actions.fetchBarsIfNeeded(location)).toBe(typeof fetchBarsMock)
        })
    })
})

describe('Yelp async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    describe('fetchBars', () => {
        it('should handle fetchBars success', () => {
            const store = mockStore()
            const location = 'NYC'
            const receivedAt = Date.now()

            fetchMock.get(`/yelp/${location}`, { barsArray: [{ 'name': 'Bar Barn' }] })

            return store.dispatch(actions.fetchBars(location))
                .then(() => {
                    expect(store.getActions()).toEqual([
                        { 
                            type: REQUEST_BARS,
                            location
                        },
                        { 
                            type: RECEIVE_BARS,
                            location,
                            bars: {barsArray: [{ 'name': 'Bar Barn' }]},
                            receivedAt
                        }
                    ])
                })
        })

        it('should handle fetchBars failure', () => {
            const store = mockStore()
            const location = 'NYC'

            fetchMock.get(`/yelp/${location}`, 400)

            return store.dispatch(actions.fetchBars(location))
                .then(() => {
                    expect(store.getActions()).toEqual([
                        {
                            type: REQUEST_BARS,
                            location
                        },
                        {
                            type: REQUEST_BARS_FAILURE
                        }
                    ])
                })
        })
    })

    describe('fetchNumAttendees', () => {
        it('should handle fetchNumAttendees success', () => {
            const store = mockStore()
            const location = 'London'

            fetchMock.get('/bars/', { activeBarsArray: [{ 'bar_id': 'bar-barn', numAttendees: 3 }, { 'bar_id': 'fluffys-factory', numAttendees: 2 }] })

            return store.dispatch(actions.fetchNumAttendees(location))
                .then(() => {
                    expect(store.getActions()).toEqual([
                        {
                            type: REQUEST_NUM_ATTENDEES,
                            location
                        },
                        {
                            type: RECEIVE_NUM_ATTENDEES,
                            location,
                            active: { activeBarsArray: [{ 'bar_id': 'bar-barn', numAttendees: 3 }, { 'bar_id': 'fluffys-factory', numAttendees: 2 }] }
                        }
                    ])
                })
        })

        it('should handle fetchNumAttendees failure', () => {
            const store = mockStore()
            const location = 'London'

            fetchMock.get('/bars/', 400)

            return store.dispatch(actions.fetchNumAttendees(location))
                .then(() => {
                    expect(store.getActions()).toEqual([
                        {
                            type: REQUEST_NUM_ATTENDEES,
                            location
                        },
                        {
                            type: REQUEST_NUM_ATTENDEES_FAILURE,
                        }
                    ])
                })
        })
    })

    
})