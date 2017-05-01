import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './modules/Navigation';
import App from './modules/App';
import Login from './modules/Login';
import Bars from './modules/Bars';

const Routes = ({ store }) => (
    <Provider store={store}>
        <Router>
            <div className='router'>
                <Navigation />
                <Route exact path='/' component={App} />
                <Route path='/login' component={Login} />
                <Route path='/bars' component={Bars} />
            </div>
        </Router>
    </Provider>
)

Routes.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Routes