import React, { Component } from 'react';

class NewChallenge extends Component {
  render() {
    return (
      <div>
        <form>
          <label >Challenge title
          <input name='challengeTitle' type='text'/>
          </label>
          <label >Challenge start date
          <input name='challengeStartDate' type='date'/>
          </label>
          <label >Challenge end date
          <input name='challengeEndDate' type='date'/>
          </label>
          <label >Challenge description
          <input name='challengeDescription' type='textarea'/>
          </label>
          <button type='submit'>Add challenge</button>
        </form>
      </div>
    );
  }
}

export default NewChallenge;
