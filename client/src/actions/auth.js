import {AUTHENTICATION, REGISTER, LOGOUT} from "../constants";
import PlextracSDK from "../util/PlextracSDK";

export const authenticate = (user) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: AUTHENTICATION.start
            });
            const response = await PlextracSDK.authenticate(user);
            dispatch({
                type: AUTHENTICATION.success,
                payload: response.data,
            });
        } catch (e) {
            dispatch({type: AUTHENTICATION.error, payload: {error: e.message, user}});
        }
    };
};

export const register = (user) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: REGISTER.start,
            });
            const response = await PlextracSDK.register(user);
            dispatch({
                type: AUTHENTICATION.success,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: REGISTER.error, payload: {error: e.message, user}
            });
        }
    }
};

export const logout = () => {
    return (dispatch) => {
        dispatch({ type: LOGOUT.success })
    };
};
