import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../actions/auth'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

import './Login.css'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            loginView: true
        }
    }

    handleView() {
        console.log('handle', this.state.loginView)
        this.setState({ loginView: !this.state.loginView })
    }

    render() {
        let formView = this.state.loginView ? <LoginForm /> : <RegisterForm />

        return (
            <div className='login-parent'>
                <div className='login-container'>          
                    <svg fill="#000000" height="240" viewBox="0 0 24 24" width="240" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"/>
                    </svg>
                    <h3>
                        {this.state.loginView ? 'Sign In to Nightlife Activity' : 'Create an account'}
                    </h3>
                    {!this.state.loginView && 
                        (
                            <p>Create a free account to be able to add yourself to the night's attendance for a meetup!</p>
                        )
                    }
                    <hr />

                    {formView}
                    
                    <br/>
                    <a onClick={() => this.handleView()}>
                        {this.state.loginView ? 'Create a Nightlife Activity account' : 'I already have an account'}
                    </a>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { 
        authenticated: state.auth.authenticated,
        profile: state.auth.profile
    }
}

export default withRouter(connect(mapStateToProps, actions)(Login));