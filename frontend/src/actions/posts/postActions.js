import axios from "axios";

import { postsConstants } from "../../constants/index";

export function createPost(post) {
    return dispatch => {
        const config = {
            headers: { "content-type": "multipart/form-data" }
        };

        dispatch({ type: postsConstants.CREATE_POST_REQUEST, post: post });

        axios
            .post("http://localhost:4000/api/post/createpost", post, config)
            .then(res => {
                console.log(res);
                dispatch({ type: postsConstants.CREATE_POST_SUCCESS });
            })
            .catch(err => {
                console.log("Error: " + err);
                dispatch({ type: postsConstants.CREATE_POST_FAILURE });
            });
    };
}
