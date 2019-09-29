import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {createLocation, getWeather} from "../actions/weather";
import {CircularProgress, Container, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import CircleCloseIcon from '@material-ui/icons/RemoveCircleOutlined';
import CirclePlusIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles(theme => ({
    pageRoot: {
        display: 'flex',
        flex: 1,
        height: window.innerHeight - 120,
        flexDirection: 'column',
    },
    topDivider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    welcome: {
        marginTop: theme.spacing(2),
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    card: {
        minWidth: '45%',
        minHeight: '50%',
        marginBottom: theme.spacing(2),
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
    typography: {
        width: '100%',
        textAlign: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: theme.spacing(1),
    },
    absolute: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
}));

const initialState = {
    showForm: false,
    city: '',
    userId: '',
    zip: null,
    state: '',
};

const Home = (props) => {
    const classes = useStyles();

    const {
        getWeather,
        loading,
        weather,
        error
    } = props;

    const [state, setState] = useState(initialState);

    useEffect(() => {
        getWeather();
    }, [getWeather]);

    const handleChange = prop => event => {
        setState({...state, [prop]: event.target.value});
    };

    const submit = event => {
        event.preventDefault();
        props.createLocation({
            city: state.city,
            state: state.state,
            country: state.country,
            zip: parseInt(state.zip, 10)
        });
        setState(initialState);
    };

    if (loading || !Object.keys(weather).length) {
        return null;
    }

    if (error) {
        return (
            <Typography align="center" color="textSecondary">
                {error}
            </Typography>
        );
    }

    return (
        <Container className={classes.pageRoot}>
            <Typography variant="h4" align="center" className={classes.welcome}>
                Welcome {props.user.firstName} {props.user.lastName}
            </Typography>
            <Divider className={classes.topDivider}/>
            {weather.map((forecast, i) => {
                return (
                    <Card key={i} className={classes.card}>
                        <Typography align="center" variant="h5" className={classes.typography}>
                            {forecast.name} Weather
                        </Typography>
                        <CardContent>
                            <Typography>
                                Current Temperature: {forecast.main.temp}K
                            </Typography>
                            <Typography>
                                Low Temp: {forecast.main.temp_min}K
                            </Typography>
                            <Typography>
                                High Temp: {forecast.main.temp_max}K
                            </Typography>
                            <Typography>
                                Pressure: {forecast.main.pressure} mm/Hg
                            </Typography>
                            <Typography>
                                Humidity: {forecast.main.humidity}%
                            </Typography>
                        </CardContent>
                    </Card>
                );
            })}
            <IconButton
                aria-label="Add location"
                onClick={() => {
                    setState({...state, showForm: true});
                }}
                color="inherit"
            >
                <CirclePlusIcon fontSize="large"/>
            </IconButton>
            {state.showForm && (
                <Card className={[classes.card, classes.absolute].join(' ')}>
                    <CardContent>
                        <Typography className={classes.typography}>
                            Add a Location
                            <IconButton
                                aria-label="close location form"
                                onClick={() => {
                                    setState({...state, showForm: false});
                                }}
                                color="inherit"
                            >
                                <CircleCloseIcon fontSize="small"/>
                            </IconButton>
                        </Typography>
                        <Divider className={classes.divider}/>
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
            )}
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        weather: state.weatherReducer.weather,
        loading: state.weatherReducer.loading,
        error: state.weatherReducer.error,
        user: state.authReducer.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getWeather: () => dispatch(getWeather()),
        createLocation: (location) => dispatch(createLocation(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
