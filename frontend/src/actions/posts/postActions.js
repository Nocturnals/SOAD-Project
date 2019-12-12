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

export function getUserPosts(user_id) {
    return dispatch => {
        dispatch({ type: postsConstants.GET_USER_POSTS_REQUEST });

        axios
            .get(`http://localhost:4000/api/post/userposts/${user_id}`)
            .then(res => {
                console.log(res);
                dispatch({
                    type: postsConstants.GET_USER_POSTS_SUCCESS,
                    posts: res.data
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: postsConstants.GET_USER_POSTS_FAILURE });
            });
    };
}

export function getHomeFeed() {
    return dispatch => {
        dispatch({ type: postsConstants.GET_HOME_FEED_REQUEST });

        axios
            .get("http://localhost:4000/api/post/posts")
            .then(res => {
                console.log(res);
                dispatch({
                    type: postsConstants.GET_HOME_FEED_SUCCESS,
                    feed: res.data
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: postsConstants.GET_HOME_FEED_FAILURE });
            });
    };
}
