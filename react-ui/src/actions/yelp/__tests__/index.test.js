import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from '../index'
import { 
    REQUEST_BARS, RECEIVE_BARS, REQUEST_BARS_FAILURE,
    REQUEST_NUM_ATTENDEES, RECEIVE_NUM_ATTENDEES, REQUEST_NUM_ATTENDEES_FAILURE, 
    SELECT_LOCATION, INVALIDATE_LOCATION,
    REQUEST_INCREASE_NUM_ATTENDEES, REQUEST_DECREASE_NUM_ATTENDEES,
    RECEIVE_INCREASE_NUM_ATTENDEES, RECEIVE_DECREASE_NUM_ATTENDEES,
    REQUEST_INCREASE_NUM_ATTENDEES_FAILURE, REQUEST_DECREASE_NUM_ATTENDEES_FAILURE
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

    it('should create an action to request increase attendance for a bar', () => {
        const id = 'the-loft-lubbock-2'
        const expectedAction = {
            type: REQUEST_INCREASE_NUM_ATTENDEES,
            id
        }

        expect(actions.requestIncreaseNumAttendees(id)).toEqual(expectedAction)
    })

    it('should create an action to receive increase attendance for a bar', () => {
        const id = 'the-loft-lubbock-2'
        const activeBarsArray = [{ 'id': 'the-loft-lubbock-2', numAttendees: 2 }, { 'id': 'snake-hole-lounge', numAttendees: 4 }]

        const expectedAction = {
            type: RECEIVE_INCREASE_NUM_ATTENDEES,
            id,
            active: activeBarsArray
        }

        expect(actions.receiveIncreaseNumAttendees(id, activeBarsArray)).toEqual(expectedAction)
    })

    it('should create an action to request decrease attendance for a bar', () => {
        const id = 'the-loft-lubbock-2'
        const expectedAction = {
            type: REQUEST_DECREASE_NUM_ATTENDEES,
            id
        }

        expect(actions.requestDecreaseNumAttendees(id)).toEqual(expectedAction)
    })

    it('should create an action to receive decrease attendance for a bar', () => {
        const id = 'the-loft-lubbock-2'
        const activeBarsArray = [{ 'id': 'the-loft-lubbock-2', numAttendees: 2 }, { 'id': 'snake-hole-lounge', numAttendees: 3 }]

        const expectedAction = {
            type: RECEIVE_DECREASE_NUM_ATTENDEES,
            id,
            active: activeBarsArray
        }

        expect(actions.receiveDecreaseNumAttendees(id, activeBarsArray)).toEqual(expectedAction)
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

    describe('firebase', () => {
        it('should create an action to login', () => {
            const expectedAction = {
                type: 'LOGIN',
                uid: '123abc'
            }

            expect(actions.login('123abc')).toEqual(expectedAction)
        })

        it('should create an action to logout', () => {
            const expectedAction = {
                type: 'LOGOUT'
            }

            expect(actions.logout()).toEqual(expectedAction)
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

    describe('putIncreaseNumAttendees', () => {
        it('should handle putIncreaseNumAttendees success', () => {
            const store = mockStore()
            const id = 'the-loft-lubbock-2'

            fetchMock.put(`/bars/inc/${id}`, { activeBarsArray: [{ 'id': 'the-loft-lubbock-2', numAttendees: 3 }, { 'id': 'fluffys-factory', numAttendees: 2 }] })

            return store.dispatch(actions.putIncreaseNumAttendees(id))
                .then(() => {
                    expect(store.getActions()).toEqual([
                        {
                            type: REQUEST_INCREASE_NUM_ATTENDEES,
                            id
                        },
                        {
                            type: RECEIVE_INCREASE_NUM_ATTENDEES,
                            id,
                            active: { activeBarsArray: [{ 'id': 'the-loft-lubbock-2', numAttendees: 3 }, { 'id': 'fluffys-factory', numAttendees: 2 }] }
                        }
                    ])
                })
        })

        it('should handle putIncreaseNumAttendees failure', () => {
            const store = mockStore()
            const id = 'the-loft-lubbock-2'

            fetchMock.put(`/bars/inc/${id}`, 400)

            return store.dispatch(actions.putIncreaseNumAttendees(id))
                .then(() => {
                    expect(store.getActions()).toEqual([
                        {
                            type: REQUEST_INCREASE_NUM_ATTENDEES,
                            id
                        },
                        {
                            type: REQUEST_INCREASE_NUM_ATTENDEES_FAILURE,
                        }
                    ])
                })
        })
    })

    describe('putDecreaseNumAttendees', () => {
        it('should handle putDecreaseNumAttendees success', () => {
            const store = mockStore()
            const id = 'the-loft-lubbock-2'

            fetchMock.put(`/bars/dec/${id}`, { activeBarsArray: [{ 'id': 'the-loft-lubbock-2', numAttendees: 2 }, { 'id': 'fluffys-factory', numAttendees: 2 }] })

            return store.dispatch(actions.putDecreaseNumAttendees(id))
                .then(() => {
                    expect(store.getActions()).toEqual([
                        {
                            type: REQUEST_DECREASE_NUM_ATTENDEES,
                            id
                        },
                        {
                            type: RECEIVE_DECREASE_NUM_ATTENDEES,
                            id,
                            active: { activeBarsArray: [{ 'id': 'the-loft-lubbock-2', numAttendees: 2 }, { 'id': 'fluffys-factory', numAttendees: 2 }] }
                        }
                    ])
                })
        })

        it('should handle putDecreaseNumAttendees failure', () => {
            const store = mockStore()
            const id = 'the-loft-lubbock-2'

            fetchMock.put(`/bars/dec/${id}`, 400)

            return store.dispatch(actions.putDecreaseNumAttendees(id))
                .then(() => {
                    expect(store.getActions()).toEqual([
                        {
                            type: REQUEST_DECREASE_NUM_ATTENDEES,
                            id
                        },
                        {
                            type: REQUEST_DECREASE_NUM_ATTENDEES_FAILURE,
                        }
                    ])
                })
        })
    })
})