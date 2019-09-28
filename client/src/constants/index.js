const createActionTypes = (str) => {
    return {
        start: `${str}_START`,
        success: `${str}_SUCCESS`,
        error: `${str}_ERROR`
    };
};

export const AUTHENTICATION = createActionTypes('AUTHENTICATION');
export const REGISTER = createActionTypes('REGISTER');
export const LOGOUT = createActionTypes('LOGOUT');

export const GET_WEATHER = createActionTypes('GET_WEATHER');
