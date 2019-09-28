import {AUTHENTICATION, LOGOUT, REGISTER} from "../constants";

const defaultState = {
    authenticated: false,
    user: {
        email: '',
        password: '',
        location: {
          city: '',
          state: '',
          zip: null,
          country: 'USA',
        },
        id: null,
        firstName: '',
        lastName: ''
    },
    loading: false,
    error: null,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case REGISTER.start:
        case AUTHENTICATION.start:
            return {
              ...state,
              loading: true,
              error: null,
            };

        case REGISTER.success:
        case AUTHENTICATION.success:
            return {
                ...state,
                ...action.payload,
                authenticated: true,
                loading: false,
            };

        case REGISTER.error:
        case AUTHENTICATION.error:
            return {
                ...state,
                error: action.payload.error,
                loading: false,
            };

        case LOGOUT.success:
            return defaultState;

        default:
            return state
    }
}
