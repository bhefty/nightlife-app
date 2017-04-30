import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './modules/App';
import Home from './modules/Home';

const Routes = (props) => (
    <Router>
        <App>
            <Switch>
                <Route exact path='/' component={Home} />
            </Switch>
        </App>
    </Router>
)

export default Routes