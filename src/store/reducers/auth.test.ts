import reducer from './auth.reducer';
import * as actionTypes from '../actions/action-types';

describe('auth reducer', () => {
    const initialState = {
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store the token upon login', () => {
        const action = {
            type: actionTypes.AUTH_SUCCESS,
            payload: {
                idToken: 'some-token',
                userId: 'some-user-id'
            }
        };

        const expected = {
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        }
        expect(reducer(initialState, action)).toEqual(expected)
    })
})