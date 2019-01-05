import React, { Component } from 'react';
import {connect } from 'react-redux';
import * as actions from '../actions'

class Navbar extends Component {
  componentDidMount(){
    this.props.fetchUser()
  }

  render() {
  console.log(this.props)

    if(this.props.user === null || this.props.user === undefined){
      return (
        <div className="navbar">
          <a href='/auth/google'>Login with Google</a>
          <br />
          <a href='/auth/reddit'>Login with Reddit</a>
        </div>
      );
    } else {
      return (
        <div>
          User: {this.props.user.name}
          <a href='/api/logout'>Logout</a>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {user: state.user}
}


export default connect(mapStateToProps, actions)(Navbar);
