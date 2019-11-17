import { docMatchConst } from "../constants";

const initialState = {
  vPlag: {
    valueOne: null,
    valueTwo: null
  },
  pPlag: {
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
        isLoading: true,
        isFailed: false
      };
    case docMatchConst.DOCMATCH_SUCCESS:
      return {
        ...state,
        vPlag: {
          valueOne: action.vPlag[0],
          valueTwo: action.vPlag[1]
        },
        pPlag: {
          valueOne: action.pPlag[0],
          valueTwo: action.pPlag[1]
        },
        // value: {
        //   valueOne: action.value[0],
        //   valueTwo: action.value[1]
        // },
        isLoading: false,
        isFailed: false
      };
    case docMatchConst.DOCMATCH_FAILURE:
      return {
        ...state,
        isFailed: true
      };
    default:
      return state;
  }
}
