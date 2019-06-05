/* eslint-disable default-case */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';


// TODO: Add location and weather API

//CONSTANTS

const SET_USER = 'SET_USER';
const SET_LOCATION = 'SET_LOCATION';

//ACTION CREATORS

const setUser = user => ({
    type: SET_USER,
    user
});

const setLocation = location => ({
    type: SET_LOCATION,
    location
});

//THUNKS

const loginAttempt = user => {
    return dispatch => {
        return axios
            .post('/api/auth', user)
            .then(response => response.data)
            .then(userData => {
                dispatch(setUser(userData));
                return true;
            });
    };
};

const ipLocationCall = () => {
    return dispatch => {
        return axios
            .get('http://ip-api.com/json/')
            .then(response => response.data)
            .then(data => {
                dispatch(setLocation(data))
            })
            .catch(error => console.log(error));
    };
};

const syncCookieAndSession = () => {
    return dispatch => {
        return axios
            .get('/api/auth')
            .then(response => response.data)
            .then(data => {
                dispatch(setUser(data));
                dispatch(ipLocationCall());
            })
            .catch(error => console.log(error));
    };
};

const createUser = user => {
    return dispatch => {
        return axios
            .post('/api/users', user)
            .then(response => response.data)
            .then(data => {
                dispatch(loginAttempt(data))
                dispatch(ipLocationCall())
                return true
            })
            .catch(error => console.log(error));
    };
};

//REDUCERS

const user = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
};

const location = (state = {}, action) => {
    switch (action.type) {
        case SET_LOCATION:
            return action.location;
        default:
            return state;
    }
};

const reducer = combineReducers({
    user,
    location
});

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export {
    store,
    loginAttempt,
    syncCookieAndSession,
    createUser,
    ipLocationCall
};
