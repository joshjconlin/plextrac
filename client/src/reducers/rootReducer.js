import {combineReducers} from 'redux';
import authReducer from "./authReducer";
import weatherReducer from "./weatherReducer";

export default combineReducers({
    authReducer,
    weatherReducer
});
