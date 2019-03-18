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
import Grid from '@material-ui/core/Grid';



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
  }

  render() {
    console.log(this.props.user.isUserAuthenticated);
    return (
      <div className="App">
      <Grid container>
      <Switch>
      {/* <Route exact path='/' component={Home}/> */}
        <Route exact path="/login" render={() => (<LoginForm user={this.props.user} onUserLogin={this.props.onUserLogin} />)}> </Route>
        {/* <Route path='/login' component={LoginForm}/> */}
        <Route exact path="/register" render={() => (<RegisterForm onChange={fields => this.handleRegistration(fields)} />)}> </Route>
      <PrivateRoute exact path='/' component = {Home} isAuthenticated={this.props.user.isUserAuthenticated}/>
        </Switch>
        </Grid>
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
