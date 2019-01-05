import React, { Component } from 'react';
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import NewChallenge from './NewChallenge'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
        <Router>
      <div className="app">
        <Navbar />
          <Route path='/' exact component={Dashboard}/>
          <Route path='/challenges/new' component={NewChallenge}/>
      </div>
        </Router>
    );
  }
}

export default App;
