import React from 'react'

import './BarItem.css'

const BarItem = (props) => {
    return (
        <span className='card'>
            <span className='card-header' style={{ backgroundImage: `url(${props.bar.image_url})` }}>
                <span className='card-title'>
                    <h3>{props.bar.name}</h3>
                </span>
            </span>
            <span className='class-summary'>
                {props.bar.rating}
            </span>
            <span className='card-meta'>
                {props.bar.location}
            </span>
        </span>
    )   
}

export default BarItem