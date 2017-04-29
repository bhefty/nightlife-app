import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './modules/App';
import Home from './modules/Home';

const Routes = (props) => (
    <App>
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
            </Switch>
        </Router>
    </App>
)

export default Routes