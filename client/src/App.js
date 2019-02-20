import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import LoginForm from './components/LoginForm';
import './App.css';
import LoginFormWrapper from './components/LoginForm';
import RegisterForm from './components/RegisterForm.js';

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
      <BrowserRouter>
      <div className="App">
          <Route path="/login" render={() => (<LoginFormWrapper onChange={fields => this.onChange(fields)}/>) }> </Route>
          <Route path="/register" render={() => (<RegisterForm onChange={fields => this.onChange(fields)}/>) }> </Route>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
