import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: [],
      zip: '',
      message: null,
      fetching: true
    };
    this.getBars = this.getBars.bind(this)
    this.getAttendance = this.getAttendance.bind(this)
    this.listBars = this.listBars.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ zip: event.target.value })
  }

  getBars(event) {
    this.setState({ bars: [] })
    event.preventDefault()

    fetch(`/yelp/${this.state.zip}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`)
        }
        return response.json()
      })
      .then(json => {
        this.setState({
          bars: json,
          zip: '',
          fetching: false
        })
      })
      .then(() => this.getAttendance())
      .catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  getAttendance() {
    let barsArray = this.state.bars
    fetch('/yelp/activebars')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.stats}`)
        }
        return response.json()
      })
      .then(json => {
        json.forEach((active_bar, idx) => {
          barsArray.forEach((bar, idx) => {
            if (bar.id === active_bar.bar_id) {
              barsArray[idx].numAttendees = active_bar.numAttendees
            }
          })
        })
      })
  }

  listBars() {
    let allBars = this.state.bars
    console.log(allBars[1].numAttendees)
    let listBars = allBars.map((bar, idx) => {
      if (bar.numAttendees) {console.log(bar.bar_id)}
      return <li key={idx}>{bar.name}</li>
    })
    return <ul>{listBars}</ul>
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {'This is '}
          <a href="https://github.com/mars/heroku-cra-node">
            {'create-react-app with a custom Node/Express server'}
          </a><br/>
        </p>
        <p className="App-intro">
          {this.state.fetching
            ? 'Fetching message from API'
            : this.state.message}
        </p>

        <form onSubmit={this.getBars}>
          <label>
            Location:
              <input type='text' value={this.state.zip} onChange={this.handleChange} />
          </label>
          <input type='submit' value='Submit' />
        </form>

        {(this.state.bars.length > 0) 
          ? 
            this.listBars()
          : 
            <ul><li>False</li></ul>}
      </div>
    );
  }
}

export default App;