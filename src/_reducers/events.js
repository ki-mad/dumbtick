import {
    GET_EVENTBYCATEGORY_FULFILLED,
    GET_EVENTBYCATEGORY_PENDING,
    GET_EVENTBYCATEGORY_REJECTED,
    GET_EVENT_FULFILLED,
    GET_EVENT_PENDING,
    GET_EVENT_REJECTED,
    GET_EVENTBYID_FULFILLED,
    GET_EVENTBYID_PENDING,
    GET_EVENTBYID_REJECTED
} from '../config/constant';

const initState = {
    dataEventByCategory: [],
    dataEvent: [],
    dataEventById: [],
    isLoading: false,
    err:true,
};

const events = (state = initState, action) => {
    switch (action.type) {
        case GET_EVENTBYCATEGORY_FULFILLED:
            return {
                ...state,
                dataEventByCategory: action.payload,
                isLoading:false
            };
        case GET_EVENTBYCATEGORY_PENDING:
            return {
                ...state,
                isLoading:true
            };
        case GET_EVENTBYCATEGORY_REJECTED:
            return {
                ...state,
                isLoading:false,
                err:true
            };
        case GET_EVENT_FULFILLED:
            return {
                ...state,
                dataEvent: action.payload,
                isLoading:false
            };
        case GET_EVENT_PENDING:
            return {
                ...state,
                isLoading:true
            };
        case GET_EVENT_REJECTED:
            return {
                ...state,
                isLoading:false,
                err:true
            };
        case GET_EVENTBYID_FULFILLED:
            return {
                ...state,
                dataEventById: action.payload,
                isLoading:false
            };
        case GET_EVENTBYID_PENDING:
            return {
                ...state,
                isLoading:true
            };
        case GET_EVENTBYID_REJECTED:
            return {
                ...state,
                isLoading:false,
                err:true
            };
        default:
            return state;
    }
}

export default events;