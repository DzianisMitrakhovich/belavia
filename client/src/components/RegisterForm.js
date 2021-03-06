import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';


export class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            registrationCompeted: false

        }
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const error = this.validate();
        if (!error) {
            // clear form
            this.setState({
                email: "",
                emailError: "",
                password: "",
                passwordError: ""
            });
            this.props.onChange({
                email: "",
                password: ""
            });
        }
        axios.post('/api/register', this.state)
            .then(this.props.onChange({
                userRegistered: true
            }))
            .then(this.props.history.push('/login'));
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
        if (this.state.password.length <= 5) {
            hasError = true;
            errors.passwordError = "Password must be at least 5 symbols long"
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
                    <Typography component="h1" variant="h5">Register new user</Typography>
                    <form onSubmit={this.handleSubmit} className={classes.form}>
                        <TextField
                            className={classes.email}
                            name="email"
                            floatingLabelText="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            errorText={this.state.emailError}
                        />
                        <br />
                        <TextField
                            className={classes.password}
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            errorText={this.state.passwordError}
                            type="password"
                            floatingLabelText="Password" />
                        <br />
                        <RaisedButton
                            className={classes.button}
                            label="Register"
                            onClick={this.handleSubmit}
                            primary />
                    </form>
                </Paper>
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

export default withRouter(withStyles(styles)(RegisterForm));
