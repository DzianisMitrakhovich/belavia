import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

function LoginContainer(props) {
    return (
        <MuiThemeProvider>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <form onSubmit={props.handleSubmit} className={classes.form}>
                        <TextField
                            className={classes.email}
                            name="email"
                            floatingLabelText="Email"
                            value={this.state.email}
                            onChange={props.handleChange}
                            errorText={this.state.emailError}
                            error={!!this.state.emailError}
                        />
                        <br />
                        <TextField
                            className={classes.password}
                            name="password"
                            value={this.state.password}
                            onChange={props.handleChange}
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
                            onClick={props.handleSubmit}
                            primary />
                    </form>
                </Paper>
                {this.state.error && <div>error </div>}
            </MuiThemeProvider>
        );
  }
  export default LoginContainer;