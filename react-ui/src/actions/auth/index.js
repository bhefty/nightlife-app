import Cookies from 'universal-cookie'
import * as types from '../types'
const cookie = new Cookies()
export const errorHandler = (dispatch, error, type) => {
    let errorMessage = error
    
    dispatch({
        type,
        payload: errorMessage
    })
}

export const loginUser = ({ email, password }) => dispatch => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }

    return fetch('/auth/login', options)
        .then(response => {
            if (response.status === 401) throw Error('An error occurred. Please verify your login credentials and try again.')
            return response.json()
        })
        .then(data => {
            cookie.set('token', data.token, { path: '/' })
            let fullName = (data.user.firstName + ' ' + data.user.lastName).toUpperCase()
            console.log('name', fullName)
            dispatch({ type: types.AUTH_USER, payload: fullName })
            window.location.href = '/bars'
        })
        .catch(error => {
            errorHandler(dispatch, error, types.AUTH_ERROR)
        })
}

export const registerUser = ({ email, firstName, lastName, password }) => dispatch => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            firstName,
            lastName,
            password
        })
    }

    return fetch('/auth/register', options)
        .then(response => {
            if (response.status === 422) throw Error('Email is already in use.')
            return response.json()
        })
        .then(data => {
            cookie.set('token', data.token, { path: '/' })
            dispatch({ type: types.AUTH_USER })
            window.location.href = '/bars'
        })
        .catch((error) => {
            errorHandler(dispatch, error, types.AUTH_ERROR)
        })
}

export const logoutUser = () => dispatch => {
    dispatch({ type: types.UNAUTH_USER })
    cookie.remove('token', { path: '/' })

    window.location.href = '/login'
}

export const fetchUserProfile = () => dispatch => {
    const token = cookie.get('token')

    const options = {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }
    return fetch('/auth/dashboard', options)
        .then(response => response.json())
        .then(data => {
            console.log('profile fech', data)
            dispatch({
                type: types.FETCH_USER_PROFILE,
                payload: data.profile
            })
        })
}

export const addBarToUserProfile = (id) => dispatch => {
    const token = cookie.get('token')

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ id })
    }

    return fetch('/auth/addbar', options)
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: types.FETCH_USER_PROFILE,
                payload: data.user
            })
        })
        .then(() => console.log('Done adding'))
}

export const removeBarFromUserProfile = (id) => dispatch => {
    const token = cookie.get('token')

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ id })
    }

    return fetch('/auth/removebar', options)
        .then(response => response.json())
        .then(data => {
            console.log('removing', data)
            dispatch({
                type: types.FETCH_USER_PROFILE,
                payload: data.user
            })
        })
        .then(() => console.log('Done remvoing'))
}

export const protectedTest = () => dispatch => {
    console.log(cookie.get('token'))
    return fetch('/auth/dashboard', { method: 'GET', headers: { 'Authorization': cookie.get('token') } })
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: types.PROTECTED_TEST,
                payload: data
            })
        })
        .catch(error => {
            console.log('error', error)
            errorHandler(dispatch, error.response, types.AUTH_ERROR)
        })
}