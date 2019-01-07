import React, { Component } from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Challenges from './Challenges';
import NewChallenge from './NewChallenge';
import NewUser from './NewUser';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import LoginScreen from './LoginScreen';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <Navbar user={this.props.user} />
        <Router>
          <div className="container">
            <nav className="breadcrumb is-centered" aria-label="breadcrumbs">
              <ul>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/challenges">Challenges</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/login" exact component={LoginScreen} />
              <Route path="/challenges/new" exact component={NewChallenge} />
              <Route path="/challenges" exact component={Challenges} />
              <Route path="/users/new" exact component={NewUser} />
              <Route path="/" exact component={Dashboard} />
            </Switch>
          </div>
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
