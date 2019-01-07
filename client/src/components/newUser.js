import React, { Component } from 'react';

class NewUser extends Component {
  render() {
    return (
      <div>
        <form>
          <label>
            User display name
            <input name="userName" type="text" />
          </label>
          <label>
            Name
            <input name="userDisplayName" type="text" />
          </label>
          <label>
            Email
            <input name="userEmail" type="text" />
          </label>
          <label>
            Avatar url
            <input name="userImageUrl" type="text" />
          </label>
          <button type="submit">Create user</button>
        </form>
      </div>
    );
  }
}

export default NewUser;
