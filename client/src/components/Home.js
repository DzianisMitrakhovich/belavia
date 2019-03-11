import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {

  logout() {
    fetch('/api/logout')
    .then((res) => {
      console.log('Okay');
      if (res.status === 200) {
        this.props.history.push('/login');
      } else {
        console.log('Nowhere to redirect');
      }
    }
    )
  }

  render() {
    return (
      <div>
        Hello from home
        <br/>
        <Link to='/api/logout' onClick={this.logout()}>Logout</Link>
      </div>
    )
  }
}

export default Home
