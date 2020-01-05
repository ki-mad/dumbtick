import {
    LOGIN_FULFILLED,
    LOGIN_REJECTED,
    LOGIN_PENDING
} from '../config/constant';

const initState = {
    dataLogin: [],
    isLoading: false,
    err:true,
};

const login = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_FULFILLED:
            return {
                ...state,
                dataLogin: action.payload,
                isLoading:false
            };
        case LOGIN_PENDING:
            return {
                ...state,
                isLoading:true
            };
        case LOGIN_REJECTED:
            return {
                ...state,
                isLoading:false,
                err:true
            };
        default:
            return state;
    }
}

export default login;