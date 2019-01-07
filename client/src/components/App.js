import React, { Component } from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Challenges from './Challenges';
import NewChallenge from './NewChallenge';
import NewUser from './NewUser';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import LoginScreen from './LoginScreen';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="">
        <Navbar user={this.props.user} />
        <Router>
          <Switch>
            <div className="container">
              <Route path="/login" exact component={LoginScreen} />
              <Route path="/challenges/new" exact component={NewChallenge} />
              <Route path="/challenges" exact component={Challenges} />
              <Route path="/users/new" exact component={NewUser} />
              <Route path="/" exact component={Dashboard} />
            </div>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    challenges: state.challenges,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(App);
