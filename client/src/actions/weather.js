import {GET_WEATHER, CREATE_LOCATION} from "../constants";
import PlextracSDK from "../util/PlextracSDK";

export const getWeather = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: GET_WEATHER.start
            });
            const response = await PlextracSDK.getMyWeather();
            dispatch({
                type: GET_WEATHER.success,
                payload: response.data,
            });
        } catch (e) {
            dispatch({type: GET_WEATHER.error, payload: {error: e.message}});
        }
    };
};

export const createLocation = (location) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: CREATE_LOCATION.start,
            });
            const response = await PlextracSDK.createLocation(location);
            dispatch({
                type: CREATE_LOCATION.success,
                payload: response.data,
            });
            dispatch(getWeather());
        } catch (e) {
            dispatch({
                type: CREATE_LOCATION.error,
                payload: {error: e.message}
            });
        }
    }
};
