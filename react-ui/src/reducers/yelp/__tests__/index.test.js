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
                items: []
            })
        })

        it('should invalidate the location', () => {
            const expectedState = {
                isFetching: false,
                didInvalidate: true,
                items: []
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
                items: []
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
                lastUpdated: receivedAt
            }

            expect(bars(undefined, {
                type: 'RECEIVE_BARS',
                bars: [{ 'name': 'Bar1' }, { 'name': 'Bar2' }],
                receivedAt
            })).toEqual(expectedState)
        })

        it('should return same state fro unknown action', () => {
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
                items: []
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