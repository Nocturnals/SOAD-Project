import axios from "axios";

export function createPost(post) {
    console.log(post);
    return dispatch => {
        axios
            .post("http://localhost:4000/api/post/createpost", post)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log("Error: " + err);
            });
    };
}
