import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { fetchUserProfile } from './actions/auth'
import Cookies from 'universal-cookie'
const cookie = new Cookies()

import Navigation from './modules/Navigation';
import Login from './modules/Login';
import Bars from './modules/Bars';

const Routes = ({ store }) => {
    const token = cookie.get('token')
    if (token) {
        store.dispatch(fetchUserProfile())
    }
    return (
        <Provider store={store}>
            <Router>
                <div className='router'>
                    <Navigation />
                    <Route exact path='/' component={Bars} />
                    <Route path='/login' component={Login} />
                </div>
            </Router>
        </Provider>
    )
}

Routes.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Routes