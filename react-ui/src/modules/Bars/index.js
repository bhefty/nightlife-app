import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBarsIfNeeded, invalidateLocation } from '../../actions'

import BarItem from './components/BarItem'

class Bars extends Component {
    componentDidMount() {
        const { dispatch, selectedLocation } = this.props
        if (selectedLocation.length !== 0) {
            dispatch(fetchBarsIfNeeded(selectedLocation))
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedLocation !== this.props.selectedLocation) {
            const { dispatch, selectedLocation } = nextProps
            dispatch(fetchBarsIfNeeded(selectedLocation))
        }
    }

    handleRefreshClick = e => {
        e.preventDefault()

        const { dispatch, selectedLocation } = this.props
        dispatch(invalidateLocation(selectedLocation))
        dispatch(fetchBarsIfNeeded(selectedLocation))
    }

    render() {
        const { selectedLocation, bars, isFetching, lastUpdated } = this.props
        const isEmpty = bars.length === 0
        return (
            <div>
                <span>
                    <h1>{selectedLocation.toUpperCase()}</h1>
                </span>
                <p>
                    {lastUpdated &&
                        <span>
                            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                            <br/>
                        </span>
                    }
                    {!isFetching && !isEmpty &&
                        <a href='#'
                            onClick={this.handleRefreshClick}>
                            Refresh results
                        </a>
                    }
                </p>
                {isEmpty
                    ? (isFetching? <h2>Loading...</h2> : <h2>Please search for a location to meet</h2>)
                    : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                            <ul>
                                {bars.map((bar, i) =>
                                    <BarItem key={i} bar={bar} />
                                )}
                            </ul>
                        </div>
                }
            </div>
        )
    }
}

Bars.propTypes = {
    selectedLocation: PropTypes.string.isRequired,
    bars: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    const { selectedLocation, barsByLocation } = state
    const {
        isFetching,
        lastUpdated,
        items: bars
    } = barsByLocation[selectedLocation] || {
        isFetching: false,
        items: []
    }

    return {
        selectedLocation,
        bars,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(Bars);