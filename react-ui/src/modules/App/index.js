import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectLocation, fetchBarsIfNeeded, invalidateLocation } from '../../actions'
import Navigation from './components/Navigation';
import SearchBar from './components/SearchBar';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.submitSearch = this.submitSearch.bind(this)
    }

    submitSearch(searchLocation) {
        const { dispatch, selectedLocation } = this.props
        dispatch(selectLocation(searchLocation))
        dispatch(invalidateLocation(selectedLocation))
        dispatch(fetchBarsIfNeeded(selectedLocation))
    }

    render() {
        return (
            <div className='App'>
                <Navigation />
                <SearchBar submitSearch={this.submitSearch} />
                <div className='App-header'>
                </div>
                {this.props.children}
            </div>
        )
    }
}

App.propTypes = {
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
        isFetching: true,
        items: []
    }

    return {
        selectedLocation,
        bars,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(App);