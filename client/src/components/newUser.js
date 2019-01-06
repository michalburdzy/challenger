import React, { Component } from 'react';

class NewUser extends Component {
  render() {
    return (
      <div>
        <form>
          <label for='userName'>User display name</label>
          <input name='userName' type='text'/>
          <label for='userDisplayName'>Name</label>
          <input name='userDisplayName' type='text'/>
          <label for='userEmail'>Email</label>
          <input name='userEmail' type='text'/>
          <label for='userImageUrl'>Avatar url</label>
          <input name='userImageUrl' type='text'/>
          <button type='submit'>Create user</button>
        </form>
      </div>
    );
  }
}

export default NewUser;
