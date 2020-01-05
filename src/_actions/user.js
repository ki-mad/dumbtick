import {
    GET_USERBYID
} from '../config/constant';
import API from '../config/api';

export const getUserById = (id) => {
    return {
        type: GET_USERBYID,
        payload: API.getUserById(id)
    }
}