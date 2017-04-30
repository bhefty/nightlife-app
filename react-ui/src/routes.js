import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './modules/App';
import Home from './modules/Home';
import Bars from './modules/Bars';

const Routes = (props) => (
    <Router>
        <App>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/bars' component={Bars} />
            </Switch>
        </App>
    </Router>
)

export default Routes