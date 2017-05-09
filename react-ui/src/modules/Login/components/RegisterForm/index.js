import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { registerUser } from '../../../../actions/auth'

import './RegisterForm.css'

const form = reduxForm({
    form: 'register',
    validate
})

const renderField = field => (
    <div>
        <input className='form-control' {...field.input} type={field.type} />
        {field.touched && field.error && <div className='error'>{field.error}</div>}
    </div>
)

function validate(formProps) {
    const errors = {}

    if (!formProps.firstName) {
        errors.firstName = 'Please enter a first name'
    }

    if (!formProps.lastName) {
        errors.lastName = 'Please enter a last name'
    }

    if (!formProps.email) {
        errors.email = 'Please enter an email'
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password'
    }

    return errors
}

class RegisterForm extends Component {
    handleFormSubmit(formProps) {
        this.props.registerUser(formProps)
    }

    renderAlert() {
        if(this.props.errorMessage) {
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
            <div className='register-form-container'>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    {this.renderAlert()}
                    <div className='row'>
                        <div className='col-md-6'>
                            <label className='lead'>First Name</label>
                            <Field name='firstName' className='form-control' component={renderField} type='text' />
                        </div>
                        <div className='col-md-6'>
                            <label className='lead'>Last Name</label>
                            <Field name='lastName' className='form-control' component={renderField} type='text' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <label className='lead'>Email</label>
                            <Field name='email' className='form-control' component={renderField} type='text' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <label className='lead'>Password</label>
                            <Field name='password' className='form-control' component={renderField} type='password' />
                        </div>
                    </div>
                    <button type='submit' className='btn btn-block btn-lg btn-primary'>Register</button>
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

export default connect(mapStateToProps, { registerUser })(form(RegisterForm))