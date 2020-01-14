import { createStore, combineReducers, applyMiddleware } from "redux";
import events from "../_reducers/events";
import favorite from "../_reducers/favorite";
import category from "../_reducers/category";
import login from "../_reducers/login";
import user from "../_reducers/user";
import payment from "../_reducers/payment"
import { logger, promiseMiddleware } from "../middleware";

const middlewares = [logger, promiseMiddleware];
//Get All reducers available
//Global state come from here
const reducers = combineReducers({
    category,
    events,
    login,
    user,
    payment,
    favorite
});

//setup store redux
const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;