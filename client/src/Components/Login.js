import React from 'react';
import {authenticate} from "../actions/auth";
import {connect} from "react-redux";
import Paper from '@material-ui/core/Paper';
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
        margin: theme.spacing(2),
        width: '90%',
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

const Login = (props) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        email: '',
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
        props.authenticate({ email: values.email, password: values.password });
    };

    return (
        <Container className={classes.pageRoot}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" className={classes.typography}>
                        Login /
                        <Button href="/register">
                            Sign up
                        </Button>
                    </Typography>
                    <Divider variant="middle" className={classes.divider}/>
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
                                <CircularProgress size={15} />
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
        authenticate: (user) => dispatch(authenticate(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
