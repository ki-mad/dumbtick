import {
    GET_FAVORITE_FULFILLED,
    GET_FAVORITE_REJECTED,
    GET_FAVORITE_PENDING
} from '../config/constant';

const initState = {
    dataFavorite: {},
    isLoading: false,
    err:true,
};

const favorite = (state = initState, action) => {
    switch (action.type) {
        case GET_FAVORITE_FULFILLED:
            return {
                ...state,
                dataFavorite: action.payload,
                isLoading:false
            };
        case GET_FAVORITE_PENDING:
            return {
                ...state,
                isLoading:true
            };
        case GET_FAVORITE_REJECTED:
            return {
                ...state,
                isLoading:false,
                err:true
            };
        default:
            return state;
    }
}

export default favorite;