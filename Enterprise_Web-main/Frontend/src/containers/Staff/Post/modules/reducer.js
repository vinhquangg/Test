import * as ActionType from "./constants";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const listPostReducer = (state2 = initialState, action) => {
  switch (action.type) {
    case ActionType.LIST_POST_REQUEST:
      state2.loading = true;
      state2.data = null;
      state2.error = null;
      return { ...state2 };

    case ActionType.LIST_POST_SUCCESS:
      state2.loading = false;
      state2.data = action.payload;
      state2.error = null;
      return { ...state2 };

    case ActionType.LIST_POST_FAILED:
      state2.loading = false;
      state2.data = null;
      state2.error = action.payload;
      return { ...state2 };

    default:
      return { ...state2 };
  }
};

export default listPostReducer;
