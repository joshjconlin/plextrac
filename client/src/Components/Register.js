import React from 'react';
import {register} from "../actions/auth";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container'
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import clsx from "clsx";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {CircularProgress} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    pageRoot: {
        display: 'flex',
        flex: 1,
        height: window.innerHeight - 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        minWidth: '45%',
        minHeight: '50%'
    },
    textField: {
        margin: theme.spacing(0.5),
        width: '98%',
    },
    button: {
        margin: theme.spacing(2),
        alignSelf: 'flex-end',
        width: '90%'
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    typography: {
        width: '100%',
        textAlign: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: theme.spacing(1),
    }
}));

const Register = (props) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        city: '',
        state: '',
        zip: null,
        country: 'USA',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const submit = event => {
        event.preventDefault();
        props.register({
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            location: {
                city: values.city,
                state: values.state,
                country: values.country,
                zip: parseInt(values.zip, 10),
            },
        });
    };

    return (
        <Container className={classes.pageRoot}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" className={classes.typography}>
                        <Button href="/">
                            Login
                        </Button> / Sign Up
                    </Typography>
                    <Divider variant="middle" className={classes.divider}/>
                    {!!props.error && (
                        <Typography color="textSecondary" align="center">
                            {props.error}
                        </Typography>
                    )}
                    <TextField
                        label="Email"
                        className={classes.textField}
                        onChange={handleChange('email')}
                    />
                    <FormControl className={clsx(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                        <Input
                            id="adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <TextField
                        label="First Name"
                        className={classes.textField}
                        onChange={handleChange('firstName')}
                    />
                    <TextField
                        label="Last Name"
                        className={classes.textField}
                        onChange={handleChange('lastName')}
                    />
                    <TextField
                        label="City"
                        className={classes.textField}
                        onChange={handleChange('city')}
                    />
                    <TextField
                        label="State"
                        className={classes.textField}
                        onChange={handleChange('state')}
                    />
                    <TextField
                        label="Zip"
                        className={classes.textField}
                        onChange={handleChange('zip')}
                    />
                    <TextField
                        label="Country"
                        className={classes.textField}
                        onChange={handleChange('country')}
                    />
                    <CardActions>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={submit}
                            disabled={props.loading}
                        >
                            Submit
                            {props.loading && (
                                <CircularProgress size={15}/>
                            )}
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        loading: state.authReducer.loading,
        error: state.authReducer.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: (user) => dispatch(register(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
