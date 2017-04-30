import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './modules/App';
import Home from './modules/Home';
import Bars from './modules/Bars';

const Routes = ({ store }) => (
    <Provider store={store}>
        <Router>
            <App>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/bars' component={Bars} />
                </Switch>
            </App>
        </Router>
    </Provider>
)

Routes.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Routes