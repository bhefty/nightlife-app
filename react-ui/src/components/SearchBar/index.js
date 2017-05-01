import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { selectLocation, fetchBarsIfNeeded, invalidateLocation } from '../../actions'
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';

import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({searchValue: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.history.push(
            {
                pathname: '/bars'
            }
        )
        if (this.state.searchValue.length !== 0) {
            const { dispatch, selectedLocation } = this.props
            dispatch(selectLocation(this.state.searchValue))
            dispatch(invalidateLocation(selectedLocation))
            if (selectedLocation.length !== 0) {
                dispatch(fetchBarsIfNeeded(selectedLocation))
                this.setState({searchValue: ''})
            }
        }
    }

    render() {
        return (
            <div className='search-component'>
                <div className='flex-container'>
                <h1 className='search-header'>Nightlife Activity</h1>
                <p className='lead'>Find a hangout. Find a friend.</p>
                <Form id='search-form' onSubmit={this.handleSubmit}>
                    <FormGroup bsSize='large' controlId='formSearchBars'>
                        <FormControl 
                            onChange={this.handleChange}
                            value={this.state.searchValue}
                            type='text' 
                            placeholder='Search by location (e.g. zipcode or cityname)' />
                    </FormGroup>
                    <Button block className='btn btn-success btn-lg' type='submit'>Search</Button>
                </Form>
                </div>
            </div>
        )
    }
}

SearchBar.propTypes = {
    selectedLocation: PropTypes.string.isRequired,
    bars: PropTypes.array.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    const { selectedLocation, barsByLocation } = state
    const {
        lastUpdated,
        items: bars
    } = barsByLocation[selectedLocation] || {
        items: []
    }

    return {
        selectedLocation,
        bars,
        lastUpdated
    }
}

export default withRouter(connect(mapStateToProps)(SearchBar));