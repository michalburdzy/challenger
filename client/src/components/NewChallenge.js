import React, { Component } from 'react';

class NewChallenge extends Component {
  render() {
    return (
      <div>
        <form>
          <label for='challengeTitle'>Challenge title</label>
          <input name='challengeTitle' type='text'/>
          <label for='challengeStartDate'>Challenge start date</label>
          <input name='challengeStartDate' type='date'/>
          <label for='challengeEndDate'>Challenge end date</label>
          <input name='challengeEndDate' type='date'/>
          <label for='challengeDescription'>Challenge description</label>
          <input name='challengeDescription' type='textarea'/>
          <button type='submit'>Add challenge</button>
        </form>
      </div>
    );
  }
}

export default NewChallenge;
