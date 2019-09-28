import {GET_WEATHER} from "../constants";
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
