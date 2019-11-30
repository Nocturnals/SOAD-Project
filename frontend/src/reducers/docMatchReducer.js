import { docMatchConst } from "../constants";

const initialState = {
  value: {
    valueOne: null,
    valueTwo: null
  },
  isLoading: null,
  isFailed: false
};
export default function docMatching(state = initialState, action) {
  switch (action.type) {
    case docMatchConst.DOCMATCH_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case docMatchConst.DOCMATCH_SUCCESS:
      return {
        ...state,
        value: {
          valueOne: action.value[0],
          valueTwo: action.value[1]
        },

        isLoading: false
      };
    case docMatchConst.DOCMATCH_FAILURE:
      return {
        value: {
          valueOne: null,
          valueTwo: null
        },
        isLoading: false,
        isFailed: true
      };
    default:
      return state;
  }
}
