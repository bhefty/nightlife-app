import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import StarRatingComponent from 'react-star-rating-component'
import './BarItem.css'
import { Button } from 'react-bootstrap'
import Waypoint from 'react-waypoint'

class BarItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            focus: ''
        }
        this.toggleClass = this.toggleClass.bind(this)
    }

    toggleClass() {
        let focusState = this.state.focus
        if (focusState === '') {
            this.setState({ focus: 'card-focus' })
        } else {
            this.setState({ focus: '' })
        }
    }
    render() {
        const { i, bar, numAttendees, handleAttendance, buttonText, buttonColor } = this.props
        return (
            <Waypoint 
                bottomOffset='25%'
                topOffset='25%'
                onEnter={() => this.toggleClass()}
                onLeave={() => this.toggleClass()}
            >
                <span key={i} className={'card ' + this.state.focus}>
                    <div className='card-attendees'>
                        {numAttendees} going tonight
                    </div>
                    <span className={'card-header ' + this.state.focus} style={{ backgroundImage: `url(${bar.image_url})` }}>
                        <span className='card-title'>
                            <h3>{bar.name}</h3>
                        </span>
                    </span>
                    <span className='card-summary lead'>
                        <div className='container-rating-price'>
                            <div className='rating'>
                                <StarRatingComponent 
                                    name='rating'
                                    starCount={5}
                                    value={bar.rating}
                                />
                            </div>
                            <div className='price'>
                                {bar.price}
                            </div>
                        </div>
                        <div className='phone'>
                            {bar.phone}
                        </div>
                        <br />
                        <ul className='location'>
                            {bar.location.map((info, i) => 
                                <li key={i}>{info}</li>
                            )}
                        </ul>
                    </span>
                    {(buttonText && buttonColor) ?
                        <span className='card-meta'>
                            <Button block className={`btn ${buttonColor}`} onClick={() => handleAttendance(bar.id)}>{buttonText}</Button>
                        </span>
                        :
                        <LinkContainer to='/login'>
                            <span className='card-meta'>
                                <Button block className={`btn btn-info`}>Sign in to join!</Button>
                            </span>
                        </LinkContainer>
                    }
                </span>
            </Waypoint>
        )
    }
}

export default BarItem