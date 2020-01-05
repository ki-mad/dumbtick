import {
    GET_USERBYID_PENDING,
    GET_USERBYID_FULFILLED,
    GET_USERBYID_REJECTED
} from '../config/constant';

const initState = {
    dataUserById: [],
    isLoading: false,
    err:true,
};

const user = (state = initState, action) => {
    switch (action.type) {
        case GET_USERBYID_FULFILLED:
            return {
                ...state,
                dataUserById: action.payload,
                isLoading:false
            };
        case GET_USERBYID_PENDING:
            return {
                ...state,
                isLoading:true
            };
        case GET_USERBYID_REJECTED:
            return {
                ...state,
                isLoading:false,
                err:true
            };
        default:
            return state;
    }
}

export default user;