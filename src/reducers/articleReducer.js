import { GET_ARTICLES, SET_LOADING_STATUS } from "../actions/actionType";

export const initState = {
  loading: false,
  articles: [],
};

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.status,
      };

    case GET_ARTICLES:
      return {
        ...state,
        articles: action.articles,
      };

    default:
      return state;
  }
};

export default articleReducer;
