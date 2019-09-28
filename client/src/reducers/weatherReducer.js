import {GET_WEATHER} from "../constants";

const defaultState = {
    weather: {},
    loading: false,
    error: null,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_WEATHER.start:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case GET_WEATHER.success:
            return {
                ...state,
                weather: action.payload,
                loading: false,
            };

        case GET_WEATHER.error:
            return {
                ...state,
                error: action.payload.error,
                loading: false,
            };

        default:
            return state
    }
}
