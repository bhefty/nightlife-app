import React from 'react';

const Home = (props) => {
    return (
        <div>
            <h1>Home!</h1>
            <p>Welcome to Home!</p>
            {props.children}
        </div>
    )
}

export default Home;