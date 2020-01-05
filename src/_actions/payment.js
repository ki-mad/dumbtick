import {
    GET_PAYMENT,
    GET_APPROVEDPAYMENT
} from '../config/constant';
import API from '../config/api';

export const getPayment = (id) => {
    return {
        type: GET_PAYMENT,
        payload: API.getPayment(id)
    }
}

export const getApprovedPayment = (id) => {
    return {
        type: GET_APPROVEDPAYMENT,
        payload: API.getApprovedPayment(id)
    }
}

