import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { loginUser } from '../../../../actions/auth'

import './LoginForm.css'

const form = reduxForm({
    form: 'login'
})

class LoginForm extends Component {
    handleFormSubmit(formProps) {
        this.props.loginUser(formProps)
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div>
                    <span><strong>Error!</strong> {this.props.errorMessage}</span>
                </div>
            )
        }
    }

    render() {
        const { handleSubmit } = this.props

        return (
            <div className='login-form-container'>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    {this.renderAlert()}
                    <div>
                        <label className='lead'>Email</label>
                        <Field name='email' className='form-control' component='input' type='text' />
                    </div>
                    <div>
                        <label className='lead'>Password</label>
                        <Field name='password' className='form-control' component='input' type='password' />
                    </div>
                    <button type='submit' className='btn btn-block btn-primary btn-lg'>Login</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message
    }
}

export default connect(mapStateToProps, { loginUser })(form(LoginForm))