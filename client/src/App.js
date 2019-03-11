import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm.js';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import { Redirect, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser} from './actions/user-actions';



class App extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userRegistered: false,
    isAuthenticated: false
  };


  handleRegistration = fields => {
    this.setState(
      {userRegistered: fields.userRegistered});
  }

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
      <Switch>
      <PrivateRoute exact path='/' component = {Home} isAuthenticated={this.props.user.isAuthenticated}/>
      {/* <Route exact path='/' component={Home}/> */}
        <Route path="/login" render={() => (<LoginForm user={this.props.user} onUserLogin={this.props.onUserLogin} />)}> </Route>
        {/* <Route path='/login' component={LoginForm}/> */}
        <Route path="/register" render={() => (<RegisterForm onChange={fields => this.handleRegistration(fields)} />)}> </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapActionsToProps = {
  onUserLogin: loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(App);
