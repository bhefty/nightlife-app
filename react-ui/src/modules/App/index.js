import React from 'react';

import './App.css';
import logo from './logo.svg';

const App = (props) => {
    return (
        <div className='App'>
            <div className='App-header'>
                <h2>Welcome to React</h2>
                <img src={logo} alt='logo' className='App-logo' />
            </div>
            <p className='App=intro'>Welcome to App!</p>
            {props.children}
        </div>
    )
}

export default App;