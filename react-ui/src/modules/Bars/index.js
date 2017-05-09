import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchBarsIfNeeded, invalidateLocation, fetchNumAttendees, putIncreaseNumAttendees } from '../../actions/yelp'
import SearchBar from '../../components/SearchBar';

import BarItem from './components/BarItem'

import './Bars.css'

class Bars extends Component {
    componentDidMount() {
        const { dispatch, selectedLocation } = this.props
        if (selectedLocation.length !== 0) {
            dispatch(fetchBarsIfNeeded(selectedLocation))
            dispatch(fetchNumAttendees(selectedLocation))
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedLocation !== this.props.selectedLocation) {
            const { dispatch, selectedLocation } = nextProps
            dispatch(fetchBarsIfNeeded(selectedLocation))
            dispatch(fetchNumAttendees(selectedLocation))
        }
    }

    handleRefreshClick = e => {
        e.preventDefault()

        const { dispatch, selectedLocation } = this.props
        dispatch(invalidateLocation(selectedLocation))
        dispatch(fetchBarsIfNeeded(selectedLocation))
    }

    getNumAttendees = id => {
        const { active } = this.props
        let filteredAttendees = active.filter((bar) => {
            return bar.bar_id === id
        })
        return (filteredAttendees.length > 0) ? filteredAttendees[0].numAttendees : 0
    }

    handleAttendance = (id) => {
        const { dispatch, selectedLocation } = this.props
        dispatch(putIncreaseNumAttendees(id))
        dispatch(fetchNumAttendees(selectedLocation))
    }

    render() {
        const { selectedLocation, bars, isFetching, lastUpdated } = this.props
        const isEmpty = bars.length === 0
        return (
            <div>
                <SearchBar />
                <div className='bars-container'>
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
                        : <div className='container' style={{ opacity: isFetching ? 0.5 : 1 }}>
                                <div className='cards'>
                                    {bars.map((bar, i) =>
                                        <BarItem 
                                                key={i}
                                                bar={bar}
                                                numAttendees={this.getNumAttendees(bar.id)}
                                                handleAttendance={(id) => this.handleAttendance(id)}
                                            />
                                    )}
                                </div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

Bars.propTypes = {
    selectedLocation: PropTypes.string.isRequired,
    bars: PropTypes.array.isRequired,
    active: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    const { selectedLocation, barsByLocation } = state
    const {
        isFetching,
        lastUpdated,
        items: bars,
        activeBars: active
    } = barsByLocation[selectedLocation] || {
        isFetching: false,
        items: [],
        activeBars: []
    }

    return {
        selectedLocation,
        bars,
        active,
        isFetching,
        lastUpdated
    }
}

export default withRouter(connect(mapStateToProps)(Bars));