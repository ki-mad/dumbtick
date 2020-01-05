import {
    LOGIN
} from '../config/constant';
import API from '../config/api';

export const getLogin = () => {
    return {
        type: LOGIN,
        payload: API.getLogin()
    }
}