import React, { Component } from 'react';
import LoginScreen from './LoginScreen'
import * as actions from '../actions'
import {connect } from 'react-redux'

class Dashboard extends Component {
  componentDidMount(){
    this.props.fetchUser()
    this.props.fetchChallenges()
  }
  render() {
    if(!this.props.user){
      return <LoginScreen />
    }
    return (
      <div >
        Dashboard
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {user: state.user, challenges: state.challenges}
}
export default connect(mapStateToProps, actions)(Dashboard);
