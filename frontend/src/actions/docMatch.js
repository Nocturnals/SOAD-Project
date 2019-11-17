import axios from "axios";
import { docMatchConst } from "../constants";
// import { history } from "../helpers";

export function matching(text1, text2) {
  return dispatch => {
    dispatch(requestDocMatch());
    // console.log(text1, text2);
    const data = {
      dataOne: text1,
      dataTwo: text2
    };
    // var output = new Array(1, 2, 3);
    axios
      .post("http://localhost:4000/postdatatoFlask", data)
      .then(res => {
        const { newdata } = res.data;
        console.log(newdata);
        dispatch(successDocMatch(newdata));
      })
      .catch(err => {
        console.log(err);
        dispatch(failDocMatch(err));
      });
  };
  function requestDocMatch() {
    return { type: docMatchConst.DOCMATCH_REQUEST };
  }

  function successDocMatch(value) {
    return { type: docMatchConst.DOCMATCH_SUCCESS, value: value };
  }

  function failDocMatch(error) {
    return { type: docMatchConst.DOCMATCH_FAILURE, error: error };
  }
}
