import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Grid, Nav, Navbar, NavItem } from 'react-bootstrap';

import './Navigation.css';

class Navigation extends Component {
    render() {
        return (
            <Navbar id="navigation" inverse staticTop collapseOnSelect={true}>
                <Grid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to='/'>Nightlife Activity</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <LinkContainer to=''>
                                <NavItem className='nav-link'>Login</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Grid>
            </Navbar>
        )
    }
}

export default Navigation;