import React from 'react'

const BarItem = (props) => {
    return (
        <li key={props.i}>{props.bar.name}</li>
    )   
}

export default BarItem