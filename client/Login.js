import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { loginAttempt } from './store';
import { connect } from 'react-redux';

class Login extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            remeberme: false
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCheck = event => {
        this.setState({ [event.target.name]: event.target.checked })
    }

    handleClick = (event) => {
        event.preventDefault();
        this.props.requestLogin(this.state)
            .then(success => {
                if (success === true) {
                    this.props.history.push('/home');
                } else {
                    console.log('Wrong email and password')
                }
            })
            .catch(error => console.log(error))
    }

    render () {

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box mt={8}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Typography component="h1" variant="h2">
                            TrypNote
                        </Typography>
                        <form noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={this.handleChange}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChange}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                                name="rememberme"
                                onChange={this.handleCheck}
                            />
                            <Box
                                mb={1}
                            >
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleClick}
                                >
                                    Sign In
                                </Button>
                            </Box>
                            <Grid container justify="flex-end">
                                <Grid item>
                                <Link to="/signup">
                                    <Typography variant="body2" color="primary"><Box fontWeight={900}>Join today!</Box></Typography>
                                </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Box>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestLogin: user => dispatch(loginAttempt(user))
    }
}

export default connect(null, mapDispatchToProps)(Login);
