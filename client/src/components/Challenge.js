import React from 'react';
import LoginScreen from './LoginScreen'
import {connect } from 'react-redux'
import * as actions from '../actions'

const Challenge = props => {
    return (
      <div className='card'>
        <div className='card-header'>
          {props.challenge.title}
        </div>
        <div className='card-content'>
          {props.challenge.description}
        </div>
      </div>
    );
  }
  const mapStateToProps = (state) => {
    return {user: state.user, challenges: state.challenges}
  }
  export default connect(mapStateToProps, actions)(Challenge);
