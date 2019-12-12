import axios from "axios";

import { artistTypesConst } from "../../constants/index";

export function getAllArtistTypes() {
    return dispatch => {
        // make isloading true
        dispatch(requestAction());

        axios
            .get("http://localhost:4000/api/colab/allTypes")
            .then(res => {
                dispatch(successAction(res.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(failuerAction());
            });
    };

    function failuerAction() {
        return { type: artistTypesConst.GET_TYPES_FAILURE };
    }

    function requestAction() {
        return { type: artistTypesConst.GET_TYPES_REQUEST };
    }

    function successAction(payload) {
        return {
            type: artistTypesConst.GET_TYPES_SUCCESS,
            payload: payload
        };
    }
}
