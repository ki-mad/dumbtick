import {
    GET_EVENTBYCATEGORY,
    GET_EVENT,
    GET_EVENTBYID
} from '../config/constant';
import API from '../config/api';

export const getEvent = () => {
    return {
        type: GET_EVENT,
        payload: API.getEvents()
    }
}

export const getEventByCategory = (id) => {
    return {
        type: GET_EVENTBYCATEGORY,
        payload: API.getEventByCategory(id)
    }
}

export const getEventById = (id) => {
    return {
        type: GET_EVENTBYID,
        payload: API.getEventById(id)
    }
}

export const postAddEvent = (data) => {
    API.postAddEvent(data)
}

