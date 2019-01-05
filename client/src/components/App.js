import React, { Component } from 'react';
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Challenges from './Challenges'
import NewChallenge from './NewChallenge'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import * as actions from '../actions'
import {connect } from 'react-redux';

class App extends Component {
  componentDidMount(){
    this.props.fetchUser()
  }
  render() {
    console.log(this.props)
    return (
    <div className="app">
      <Navbar user={this.props.user}/>
        <Router>
          <div>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/challenges' exact component={Challenges}/>
            <Route path='/challenges/new' component={NewChallenge}/>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    challenges: state.challenges
  }
}

export default connect(mapStateToProps, actions)(App);
