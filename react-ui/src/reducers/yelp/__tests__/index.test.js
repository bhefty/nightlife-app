import { selectedLocation, bars, barsByLocation } from '../index'

describe('Yelp reducer', () => {
    describe('selectedLocation', () => {
        it('should return proper initial state', () => {
            expect(selectedLocation(undefined, {})).toEqual('')
        })

        it('should add the location', () => {
            expect(selectedLocation(undefined, {
                type: 'SELECT_LOCATION',
                location: 'Denver'
            })).toEqual('Denver')
        })

        it('should return same state for unknown action', () => {
            expect(selectedLocation('NYC', {
                type: 'UNKNOWN_ACTION'
            })).toEqual('NYC')
        })
    })

    describe('bars', () => {
        it('should return proper initial state', () => {
            expect(bars(undefined, {})).toEqual({
                isFetching: false,
                didInvalidate: false,
                items: [],
                activeBars: []
            })
        })

        it('should invalidate the location', () => {
            const expectedState = {
                isFetching: false,
                didInvalidate: true,
                items: [],
                activeBars: []
            }

            expect(bars(undefined, {
                type: 'INVALIDATE_LOCATION',
                didInvalidate: true
            })).toEqual(expectedState)
        })

        it('should request bars', () => {
            const expectedState = {
                isFetching: true,
                didInvalidate: false,
                items: [],
                activeBars: []
            }

            expect(bars(undefined, {
                type: 'REQUEST_BARS',
            })).toEqual(expectedState)
        })

        it('should receive bars', () => {
            const barsItems = [{ 'name': 'Bar1' }, { 'name': 'Bar2' }]
            Date.now = jest.fn(() => 1493947561218)
            const receivedAt = Date.now

            const expectedState = {
                isFetching: false,
                didInvalidate: false,
                items: barsItems, 
                activeBars: [],
                lastUpdated: receivedAt
            }

            expect(bars(undefined, {
                type: 'RECEIVE_BARS',
                bars: [{ 'name': 'Bar1' }, { 'name': 'Bar2' }],
                receivedAt
            })).toEqual(expectedState)
        })

        it('should request numAttendees', () => {
            const expectedState = {
                isFetching: true,
                didInvalidate: false,
                items: [],
                activeBars: []
            }

            expect(bars(undefined, {
                type: 'REQUEST_NUM_ATTENDEES',
            })).toEqual(expectedState)
        })

        it('should receive numAttendees', () => {
            const activeBars = [{ 'bar_id': 'Bar1', 'numAttendees': 3 }, { 'bar_id': 'Bar2', 'numAttendees': 1 }]
            const location = 'London'
            const expectedState = {
                isFetching: false,
                didInvalidate: false,
                items: [], 
                activeBars,
            }

            expect(bars(undefined, {
                type: 'RECEIVE_NUM_ATTENDEES',
                location,
                active: activeBars
            })).toEqual(expectedState)
        })

        it('should return same state for unknown action', () => {
            const expectedState = {
                isFetching: true,
                didInvalidate: true,
                items: ['Test']
            }
            expect(bars(expectedState, {
                type: 'UNKNOWN_ACTION'
            })).toEqual(expectedState)
        })
    })

    describe('barsByLocation', () => {
        it('should return proper initial state', () => {
            expect(barsByLocation(undefined, {})).toEqual({})
        })

        it('should invalidate the location', () => {
            const expectedState = {
                isFetching: false,
                didInvalidate: true,
                items: [],
                activeBars: []
            }
            const location = 'San Diego'
            expect(barsByLocation(undefined, {
                type: 'INVALIDATE_LOCATION',
                location
            })).toEqual({ [location]: expectedState})
        })

        it('should receive bars', () => {
            const barsItems = [{ 'name': 'Bar1' }, { 'name': 'Bar2' }]
            Date.now = jest.fn(() => 1493947561218)
            const receivedAt = Date.now

            const expectedState = {
                isFetching: false,
                didInvalidate: false,
                items: barsItems,
                activeBars: [],
                lastUpdated: receivedAt
            }
            const location = 'San Diego'
            expect(barsByLocation(undefined, {
                type: 'RECEIVE_BARS',
                bars: [{ 'name': 'Bar1' }, { 'name': 'Bar2' }],
                location,
                receivedAt
            })).toEqual({ [location]: expectedState})
        })

        it('should request bars', () => {
            const location = 'Paris'
            const expectedState = {
                isFetching: true,
                didInvalidate: false,
                items: [],
                activeBars: [],
            }
            expect(barsByLocation(undefined, {
                type: 'REQUEST_BARS',
                location
            })).toEqual({ [location]: expectedState})
        })

        it('should return same state for unknown action', () => {
            expect(barsByLocation('NYC', {
                type: 'UNKNOWN_ACTION'
            })).toEqual('NYC')
        })
    })
})