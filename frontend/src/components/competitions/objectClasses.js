export class Participant {
    constructor(name, job, image) {
        this.name = name;
        this.job = job;
        this.image = image;
    }
}

export class Comment {
    constructor(user, time, comment, likes, replies = []) {
        this.user = user;
        this.time = time;
        this.likes = likes;
        this.comment = comment;
        this.replies = replies;
    }
}
