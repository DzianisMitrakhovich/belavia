import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export class RegistrationForm extends Component {
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
        return (
            <MuiThemeProvider>
                <h2>Register new user</h2>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <br />
                    <TextField
                        name="email"
                        floatingLabelText="Email"
                        value={this.state.email}
                        onChange={e => this.handleChange(e)}
                        errorText={this.state.emailError}
                    />
                    <br />
                    <TextField
                        name="password"
                        value={this.state.password}
                        onChange={e => this.handleChange(e)}
                        errorText={this.state.passwordError}
                        type="password"
                        floatingLabelText="Password" />
                    <br />
                    <RaisedButton
                        label="Submit"
                        onClick={e => this.handleSubmit(e)}
                        style={styles.button}
                        primary />
                </form>
            </MuiThemeProvider>
        )
    }
}

const styles = {
    button: {
        margin: 15
    }
};

export default RegistrationForm
