import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Grid, Nav, Navbar, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/auth'

import './Navigation.css';

class Navigation extends Component {    
    render() {
        const { authenticated } = this.props
        let authNav = authenticated ? 
                        <NavItem className='nav-link' onClick={() => this.props.logoutUser()}>Logout</NavItem>
                        :
                        <NavItem className='nav-link'>Login</NavItem>
        return (
            <Navbar id="navigation" inverse staticTop collapseOnSelect={true}>
                <Grid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <NavLink to='/'>Nightlife Activity</NavLink>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <LinkContainer to='/login'>
                                {authNav}
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Grid>
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps, { logoutUser })(Navigation);