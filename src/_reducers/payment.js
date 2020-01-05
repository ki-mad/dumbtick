import {
  GET_PAYMENT_FULFILLED,
  GET_PAYMENT_PENDING,
  GET_PAYMENT_REJECTED,
  GET_APPROVEDPAYMENT_FULFILLED,
  GET_APPROVEDPAYMENT_PENDING,
  GET_APPROVEDPAYMENT_REJECTED
} from "../config/constant";

const initState = {
  dataPayment: [],
  dataApprovedPayment: [],
  isLoading: false,
  err: true
};

const payment = (state = initState, action) => {
  switch (action.type) {
    case GET_PAYMENT_FULFILLED:
      return {
        ...state,
        dataPayment: action.payload,
        isLoading: false
      };
    case GET_PAYMENT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PAYMENT_REJECTED:
      return {
        ...state,
        isLoading: false,
        err: true
      };
    case GET_APPROVEDPAYMENT_FULFILLED:
      return {
        ...state,
        dataApprovedPayment: action.payload,
        isLoading: false
      };
    case GET_APPROVEDPAYMENT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_APPROVEDPAYMENT_REJECTED:
      return {
        ...state,
        isLoading: false,
        err: true
      };
    default:
      return state;
  }
};

export default payment;
