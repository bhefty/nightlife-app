import React, { Component } from 'react';
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
        if (this.state.searchValue.length !== 0) {
            this.props.submitSearch(this.state.searchValue)
            this.setState({searchValue: ''})
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

export default SearchBar;