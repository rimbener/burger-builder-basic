import axios from 'axios';
import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from "./action-types"

export const authStart = () => {
    return {
        type: AUTH_START
    }
}

export const authSuccess = (idToken: string, localId: string) => {
    return {
        type: AUTH_SUCCESS,
        payload: {
            idToken,
            userId: localId
        }
    }
}

export const authFail = (error: any) => {
    return {
        type: AUTH_FAIL,
        error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime: number) => {
    return (dispatch: any) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email: string, password: string, isSignUp: boolean) => {
    return (dispatch: any) => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFN8kgpbIS9_e3F9_TOdHGmCNTERPeBTE';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDFN8kgpbIS9_e3F9_TOdHGmCNTERPeBTE';
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate.toString());
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch((error) => {
                console.error(error.response.data.error);
                dispatch(authFail(error.response.data.error));
            });
    }
}

export const setAuthRedirectPath = (path: string) => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return (dispatch: any) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const expirationDateStr = localStorage.getItem('expirationDate');
        if (!token || !userId || !expirationDateStr) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(expirationDateStr);
            if (expirationDate > new Date()) {
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime() / 1000)));
            }
        }
    }
}