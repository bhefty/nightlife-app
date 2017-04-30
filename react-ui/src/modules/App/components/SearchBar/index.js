import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';

import './SearchBar.css';

class SearchBar extends Component {
    render() {
        return (
            <div className='search-component'>
                <div className='flex-container'>
                <h1 className='search-header'>Nightlife Activity</h1>
                <p className='lead'>Find a hangout. Find a friend.</p>
                <Form id='search-form'>
                    <FormGroup bsSize='large' controlId='formSearchBars'>
                        <FormControl type='text' placeholder='Search by location (e.g. zipcode or cityname)' />
                    </FormGroup>
                    <Button block className='btn btn-success btn-lg' type='submit'>Search</Button>
                </Form>
                </div>
            </div>
        )
    }
}

export default SearchBar;