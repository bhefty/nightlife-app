import React from 'react';

const Login = (props) => {
    return (
        <div>
            <h1>Login!</h1>
            <p>Welcome to Login!</p>
            {props.children}
        </div>
    )
}

export default Login;