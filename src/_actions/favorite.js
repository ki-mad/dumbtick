import { GET_FAVORITE } from "../config/constant";
import API from "../config/api";

export const getFavorite = (id) => {
  return {
    type: GET_FAVORITE,
    payload: API.getFavorite(id)
  };
};
