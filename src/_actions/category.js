import { GET_CATEGORY, GET_CATEGORYBYID } from "../config/constant";
import API from "../config/api";

export const getCategories = () => {
  return {
    type: GET_CATEGORY,
    payload: API.getCategories()
  };
};

export const getCategoryById = (id) => {
  return {
    type: GET_CATEGORYBYID,
    payload: API.getCategoryById(id)
  };
};
