import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getWeather} from "../actions/weather";
import {Container, makeStyles} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

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
    outerGrid: {
        width: '100%',
    }
}));

const Home = (props) => {
    const classes = useStyles();

    const {
        getWeather,
        loading,
        weather,
        error
    } = props;

    useEffect(() => {
        getWeather();
    }, [getWeather]);
    console.log(weather);

    if (loading || !Object.keys(weather).length) {
        return (
            <Container className={classes.pageRoot}>
                <CircularProgress size="small"/>
            </Container>
        );
    }
    //{coord: {…}, weather: Array(1), base: "stations", main: {…}, visibility: 16093, …}
    // base: "stations"
    // clouds: {all: 1}
    // cod: 200
    // coord: {lon: -116.57, lat: 43.54}
    // dt: 1569649193
    // id: 0
    // main: {temp: 283.92, pressure: 1004, humidity: 62, temp_min: 281.48, temp_max: 287.15}
    // name: "Nampa"
    // sys: {type: 1, id: 4829, message: 0.0085, country: "US", sunrise: 1569591536, …}
    // timezone: -21600
    // visibility: 16093
    // weather: [{…}] weather: Array(1)
    // 0:
    // description: "clear sky"
    // icon: "01n"
    // id: 800
    // main: "Clear"
    // wind: {speed: 2.23, deg: 284.665}
    return (
        <Container className={classes.pageRoot}>
            <Typography variant="h4" align="center" className={classes.welcome}>
                Welcome {props.user.firstName} {props.user.lastName}
            </Typography>
            <Divider className={classes.topDivider}/>
            <Card>
                <Typography align="center" variant="h5">
                    {weather.name} Weather
                </Typography>
                <Grid container spacing={2} className={classes.outerGrid}>
                    <CardContent>
                        <Grid item xs={4}>
                            <Typography>
                                Current Temperature: {weather.main.temp}K
                            </Typography>
                            <Typography>
                                Low Temp: {weather.main.temp_min}K
                            </Typography>
                            <Typography>
                                High Temp: {weather.main.temp_max}K
                            </Typography>
                            <Typography>
                                Pressure: {weather.main.pressure} mm/Hg
                            </Typography>
                            <Typography>
                                Humidity: {weather.main.humidity}%
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>
                                General Conditions: {weather.weather[0] ? weather.weather[0].description : 'Unknown'}
                            </Typography>
                        </Grid>
                    </CardContent>
                </Grid>
            </Card>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
