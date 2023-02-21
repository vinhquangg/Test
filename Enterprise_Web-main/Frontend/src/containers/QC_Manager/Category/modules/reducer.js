import * as ActionType from "./constants";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const listCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LIST_CATEGORY_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case ActionType.LIST_CATEGORY_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case ActionType.LIST_CATEGORY_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default listCategoryReducer;
