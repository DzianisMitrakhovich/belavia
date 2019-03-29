import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { red } from '@material-ui/core/colors';
import LoginContainer from './LoginContainer';
import services from '../services/index';



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

    componentDidMount() {
        console.log(services);
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
                <LoginContainer 
                handleChange={this.handleChange} 
                handleSubmit={this.handleSubmit}/>
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


