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
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  handleChange(event) {
    this.setState({ zip: event.target.value })
  }

  getBars(event) {
    this.setState({ bars: [], zip: '' })
    event.preventDefault()

    fetch('/api/79416')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`)
        }
        return response.json()
      })
      .then(json => {
        console.log(json)
        this.setState({
          bars: json.businesses,
          fetching: false
        })
      })
      .catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
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

        <ul>
          {(this.state.bars.length > 0) 
            ? 
              this.state.bars.map((bar, idx) => <li key={idx}>{bar.name}</li>)
            : 
              <li>False</li>}
        </ul>
      </div>
    );
  }
}

export default App;
