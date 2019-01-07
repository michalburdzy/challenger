import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ChallengePreview from './ChallengePreview';
import LoginScreen from './LoginScreen';

class Challenges extends Component {
  componentDidMount() {
    this.props.fetchChallenges();
  }
  render() {
    let challenges = 'Loading challenges...';
    if (!this.props.user) {
      challenges = <LoginScreen />;
    }
    if (this.props.user && this.props.challenges) {
      challenges = this.props.challenges.map(el => (
        <ChallengePreview key={el._id} challenge={el} />
      ));
    }
    if (this.props.challenges && this.props.challenges.length === 0) {
      challenges = <div>No challenges yet</div>;
    }
    return (
      <div>
        <ul>{challenges}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user, challenges } = state;
  return { user, challenges };
};

export default connect(
  mapStateToProps,
  actions,
)(Challenges);
