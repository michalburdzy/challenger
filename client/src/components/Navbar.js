import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    if(this.props.user === null || this.props.user === undefined){
      return (
        <div className="navbar is-light" role="navigation" aria-label="main navigation">
          <div className='navbar-brand'>Challenger</div>
          <div className='navbar-menu'>
            <div className='navbar-end'>
              <div className='navbar-item has-dropdown is-hoverable'>
                <div className='navbar-link'>
                  Login
                </div>
                <div className='navbar-dropdown'>
                  <div className='navbar-item'>
                    <a href='/auth/google'>with Google</a>
                  </div>
                  <div className='navbar-item'>
                    <a href='/auth/reddit'>with Reddit</a>
                  </div>
                </div>
              </div>
              <div className='navbar-item'></div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="navbar" role="navigation" aria-label="main navigation">
          <div className='navbar-brand'>Challenger</div>
          <div className='navbar-menu'>
            <div className='navbar-end'>
              <div className='navbar-item'>
                Hello, {this.props.user.name}!
              </div>
              <div className='navbar-item'>
                <a href='/api/logout'>Logout</a>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Navbar;
