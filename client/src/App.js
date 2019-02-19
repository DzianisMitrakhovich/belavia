import React, { Component } from 'react';
// import LoginForm from './components/LoginForm';
import './App.css';
import LoginFormWrapper from './components/LoginForm';

class App extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  onChange = updatedValues => {
    this.setState({ updatedValues });
  };

  componentDidMount() {
    this.callApi()
      .then(user => this.setState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/user');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  };

  render() {
    return (
      <div className="App">
          <LoginFormWrapper onChange={fields => this.onChange(fields)} />
      </div>
    );
  }
}

export default App;
