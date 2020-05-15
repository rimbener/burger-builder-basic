import * as actionTypes from '../actions/action-types';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state: any) => {
    return {
        ...state,
        token: null,
        userId: null,
        error: null,
        loading: true
    }
}

const authSuccess = (state: any, action: any) => {
    return {
        ...state,
        token: action.payload.idToken,
        userId: action.payload.userId,
        error: null,
        loading: false
    }
}

const authFail = (state: any, action: any) => {
    return {
        ...state,
        error: action.error,
        loading: false
    }
}

const authLogout = (state: any) => {
    return {
        ...state,
        token: null,
        userId: null
    }
}

const setAuthRedirectPath = (state: any, action: any) => {
    return {
        ...state,
        authRedirectPath: action.path
    }
}

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
}

export default authReducer;