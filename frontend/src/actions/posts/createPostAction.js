import axios from "axios";

export function createPost(post) {
    axios
        .post("http://localhost:4000/api/post/createpost", post)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
}
