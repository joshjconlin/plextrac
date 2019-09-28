import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar/AppBar";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {connect} from "react-redux";
import {logout} from "../actions/auth";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const TopBar = (props) => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Plextrac Weather
                </Typography>
                {props.isAuthenticated && (
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={props.logout}
                        color="inherit"
                    >
                        <ExitToAppIcon />
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = (state) => {
 return {
   isAuthenticated: state.authReducer.authenticated,
 };
};

const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
