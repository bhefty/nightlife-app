import React, { Component } from 'react';
import PropTypes from 'prop-types'
import scrollToComponent from 'react-scroll-to-component'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { selectLocation, fetchBarsIfNeeded, invalidateLocation, fetchNumAttendees, putIncreaseNumAttendees, putDecreaseNumAttendees } from '../../actions/yelp'
import { fetchUserProfile, addBarToUserProfile, removeBarFromUserProfile, addLocationToProfile } from '../../actions/auth'
import SearchBar from '../../components/SearchBar';
import Placeholder from './components/Placeholder'
import Loading from './components/Loading'

import BarItem from './components/BarItem'

import './Bars.css'

class Bars extends Component {
    constructor() {
        super()
        this.state = {
            initSearch: true,
            resultsDiv: null
        }
        this.handleSmoothScroll = this.handleSmoothScroll.bind(this)
    }
    componentDidMount() {
        const { dispatch, selectedLocation } = this.props
        
        if (selectedLocation.length !== 0) {
            dispatch(fetchBarsIfNeeded(selectedLocation))
            dispatch(fetchNumAttendees(selectedLocation))
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.lastLocation) {
            if (nextProps.profile.lastLocation.length !== 0 && this.state.initSearch) {
                const { dispatch, selectedLocation, profile } = nextProps
                dispatch(selectLocation(profile.lastLocation))
                dispatch(invalidateLocation(selectedLocation))
                this.setState({ initSearch: false })
            }
        }
        if (nextProps.selectedLocation !== this.props.selectedLocation) {
            const { dispatch, selectedLocation } = nextProps
            dispatch(fetchBarsIfNeeded(selectedLocation))
            dispatch(fetchNumAttendees(selectedLocation))
            if (nextProps.authenticated) {
                dispatch(addLocationToProfile(selectedLocation))
            }
        }
    }

    getNumAttendees = id => {
        const { active } = this.props
        let filteredAttendees = active.filter((bar) => {
            return bar.bar_id === id
        })
        return (filteredAttendees.length > 0) ? filteredAttendees[0].numAttendees : 0
    }

    handleAttendance = (id) => {
        const { dispatch, selectedLocation, profile } = this.props
        dispatch(fetchUserProfile())
        const barAttendedPosition = profile.barsAttending.map(bar => bar.bar_id).indexOf(id)
        
        if (barAttendedPosition === -1) {
            dispatch(addBarToUserProfile(id))
            dispatch(putIncreaseNumAttendees(id))
        } else {
            dispatch(removeBarFromUserProfile(id))
            dispatch(putDecreaseNumAttendees(id))
        }
        
        dispatch(fetchNumAttendees(selectedLocation))
    }

    handleSmoothScroll = () => {
        scrollToComponent(this.Results, {
            align: 'top',
            duration: 200
        })
    }

    render() {
        const { selectedLocation, bars, isFetching } = this.props
        const isEmpty = bars.length === 0
        return (
            <div>
                <SearchBar />
                <div className='bars-container' ref={(ref) => this.Results = ref}>
                    {!isFetching && !isEmpty &&
                        <span>
                            <p className='lead'>Displaying locations for:</p>
                            <h1>{selectedLocation.toUpperCase()}</h1>
                        </span>
                    }
                    {isEmpty
                        ? (isFetching ? <Loading /> : <Placeholder />)
                        : <div className='container' style={{ opacity: isFetching ? 0.5 : 1 }}>
                                <div className='cards'>
                                    {bars.map((bar, i) => {
                                        if (this.props.authenticated) {
                                            const barAttendedPosition = this.props.profile.barsAttending.map(bar => bar.bar_id).indexOf(bar.id)
                                            const buttonText = (barAttendedPosition === -1) ? 'Count me in!' : 'Sorry, can\'t go!'
                                            const buttonColor = (barAttendedPosition === -1) ? 'btn-success' : 'btn-danger'
                                       
                                            return (
                                                <BarItem 
                                                        key={i}
                                                        bar={bar}
                                                        numAttendees={this.getNumAttendees(bar.id)}
                                                        handleAttendance={(id) => this.handleAttendance(id)}
                                                        buttonText={buttonText}
                                                        buttonColor={buttonColor}
                                                    />
                                            )
                                        } else {
                                       
                                            return (
                                                <BarItem 
                                                        key={i}
                                                        bar={bar}
                                                        numAttendees={this.getNumAttendees(bar.id)}
                                                        handleAttendance={(id) => this.handleAttendance(id)}
                                                    />
                                            )
                                        }
                                        
                                        
                                    })}
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
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    const { selectedLocation, barsByLocation } = state
    const {
        isFetching,
        items: bars,
        activeBars: active
    } = barsByLocation[selectedLocation] || {
        isFetching: false,
        items: [],
        activeBars: []
    }

    const { authenticated, profile } = state.auth
    return {
        selectedLocation,
        bars,
        active,
        isFetching,
        authenticated,
        profile
    }
}

export default withRouter(connect(mapStateToProps)(Bars));