import React, { Component } from 'react';

import Navigation from './components/Navigation';
import SearchBar from './components/SearchBar';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bars: [],
            location: '',
            fetching: false
        }
    }

    render() {
        return (
            <div className='App'>
                <Navigation />
                <SearchBar />
                <div className='App-header'>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default App;