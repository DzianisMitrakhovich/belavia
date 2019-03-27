import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { red } from '@material-ui/core/colors';

// import {user} from '../services';



export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: ''
        }
    }

    handleChange = (event) => {
        event.preventDefault(); //required?
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const error = this.validate();
        if (error) return;
            // clear form
            this.setState({
                email: "",
                emailError: "",
                password: "",
                passwordError: ""
            });
        axios.post('/api/login', this.state)
            .then((res)=> {
                console.log(res.status);
                if (res.status === 200) {
                    console.log(this.props);
                    // calling user-actions
                    this.props.onUserLogin({isUserAuthenticated: true})
                    console.log(this.props.user);
                    this.props.history.push('/');
                } else if (res.status === 204) {
                    this.setState(
                        {
                            ...this.state,
                            loginError: "Bad credentials. Please, try again"
                        }
                    )
                }
            }
            )
            .then(this.props.history.push('/'))
            .catch((error) => console.log(error));
    }

    validate = () => {
        let hasError = false;
        const errors = {
            emailError: '',
            passwordError: ''
        };
        if (this.state.email.indexOf('@') === -1) {
            hasError = true;
            errors.emailError = "Email is not valid"
        } 
        if (!this.state.email) {
            // If email field is empty
            hasError = true;
            errors.emailError = "Email must not be empty"
        }
        if (this.state.password.length <= 5) {
            hasError = true;
            errors.passwordError = "Password must be at least 5 symbols long"
        } 
        if (!this.state.password) {
            // If password field is empty
            hasError = true;
            errors.passwordError = "Password must not be empty"
        }
        if (hasError) {
            this.setState(
                {
                    ...this.state,
                    ...errors
                }
            )
        }
        return hasError;
    }

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <form onSubmit={e => this.handleSubmit(e)} className={classes.form}>
                        <TextField
                            className={classes.email}
                            name="email"
                            floatingLabelText="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            errorText={this.state.emailError}
                            error={!!this.state.emailError}
                        />
                        <br />
                        <TextField
                            className={classes.password}
                            name="password"
                            value={this.state.password}
                            onChange={e => this.handleChange(e)}
                            errorText={this.state.passwordError}
                            error={!!this.state.passwordError}
                            type="password"
                            floatingLabelText="Password" />
                        <br />
                        <div style={{ display: 'inline-flex' }}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Typography component="h1" variant="body1">
                            <Link to="/register" component={RouterLink} className={classes.Link}>Not registered?</Link>
                            </Typography>
                        </div>
                        <br />
                        
                        {/* if there's a login error */}

                        {this.state.loginError ? <p style={{color: 'red'}}>Bad credentials. Please try again</p> : null}

                        <RaisedButton
                            className={classes.button}
                            label="Submit"
                            onClick={e => this.handleSubmit(e)}
                            primary />
                    </form>
                </Paper>
                {this.state.error && <div>error </div>}
            </MuiThemeProvider>
        )
    }
}

const styles = theme => ({
    Link: {
        paddingTop: '80px',
        margin: 20
    },
    form: {
    },
    loginError: {
        color: red
    },
    email: {
        width: '100%',
        paddingRight: '80px'
    },
    password: {
        width: '100%',
        paddingRight: '80px'
    },
    button: {
        margin: 20,
        flexDirection: 'column',
        minWidth: '330px'
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
        marginLeft: theme.spacing.unit * 95,
        marginRight: theme.spacing.unit * 95
    }
});

export default withRouter(withStyles(styles)(LoginForm));


