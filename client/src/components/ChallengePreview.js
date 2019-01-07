import React from 'react';

const ChallengePreview = props => {
  return (
    <div className="card">
      <div className="card-header">{props.challenge.title}</div>
      <div className="card-content">{props.challenge.description}</div>
    </div>
  );
};

export default ChallengePreview;
