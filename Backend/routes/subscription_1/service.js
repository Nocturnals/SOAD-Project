const express = require("express");
const { verifyToken, verifyUserWithToken } = require("../auth/helper");
const router = express.Router();
planModel = require("./../../models/Subcriptions");
postModel = require("./../../models/Post");
const { planpostModel } = require("./../../models/Subcriptions");
const UserModel = require("./../../models/user");
const { OtheruserModel } = require("./../../models/Otheruser");
const { addtoplanValidation } = require("./serviceValidation");

router.post(
    "/showallplans",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        // const user = req.loggedUser;

        try {
            const plans = await planModel.find().select("name , _id");
            res.send(plans);
        } catch (error) {
            res.status(500).json({ message: "internal server error" });
        }
    }
);

router.post(
    "/subscribe/:id",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        try {
            var isalreadypresent = false;
            const user = new OtheruserModel({
                _id: req.loggedUser._id,
                username: req.loggedUser.name,
                profileurl: req.loggedUser.profileurl
            });

            const plan = await planModel.findById(req.params.id);
            if (plan) {
                plan.subscribers.forEach(i => {
                    if (JSON.stringify(i.id) == JSON.stringify(user.id)) {
                        isalreadypresent = true;
                    }
                });

                if (!isalreadypresent) {
                    plan.subscribers.push(user);
                    plan.save();
                    return res.send(plan);
                } else {
                    return res.json({
                        message: "You already Subscribed to this plan"
                    });
                }
            } else {
                return res.status(400).json({ message: "invalid planid" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "internal server error" });
        }
    }
);

router.post(
    "/becomecontentcreator/:id",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        var isalreadypresent = false;
        try {
            const user = await UserModel.findById(req.loggedUser._id);
            const contentCreator = new OtheruserModel({
                _id: req.loggedUser._id,
                username: req.loggedUser.name,
                profileurl: req.loggedUser.profileurl
            });
            const plan = await planModel.findById(req.params.id);
            if (user.followers.length >= plan.threshold) {
                plan.contentCreators.forEach(i => {
                    if (
                        JSON.stringify(i.id) ==
                        JSON.stringify(contentCreator.id)
                    ) {
                        isalreadypresent = true;
                    }
                });

                if (!isalreadypresent) {
                    plan.contentCreators.push(contentCreator);
                    plan.save();
                    return res.send(plan);
                } else {
                    return res.json({
                        message:
                            "You are already a content creator of that plan"
                    });
                }
            } else {
                return res.status(400).json({
                    message: "You dont have enough followers to join this plan"
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "internal server error" });
        }
    }
);

router.post(
    "/addtoplan/:id",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        const validatedData = addtoplanValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        try {
            var isalreadypresent = false;
            const post = await postModel.findById(req.body.postid);
            // console.log(post);
            var planflag = false;

            const plan = await planModel.findById(req.params.id);
            // console.log(plan.contentCreators.length);
            plan.contentCreators.forEach(i => {
                if (
                    JSON.stringify(i._id) == JSON.stringify(req.loggedUser._id)
                ) {
                    planflag = true;
                }
            });
            // console.log(post);
            // console.log(planflag);
            // console.log(typeof post.isPrivate);
            // console.log(req.loggedUser._id, post.owner[0]._id);
            if (
                JSON.stringify(req.loggedUser._id) ==
                    JSON.stringify(post.owner[0]._id) &&
                planflag
            ) {
                const planpost = new planpostModel({
                    id: post._id,
                    title: post.title,
                    description: post.description,
                    category: post.category
                });
                // console.log("d;ofjisrjgio");
                // console.log(planpost);

                plan.posts.forEach(i => {
                    if (JSON.stringify(planpost.id) == JSON.stringify(i.id)) {
                        isalreadypresent = true;
                    }
                });

                if (!isalreadypresent) {
                    plan.posts.push(planpost);
                    plan.save();
                    return res.json(plan);
                } else {
                    return res.json({ message: "post is already in plan" });
                }
            } else {
                return res
                    .status(400)
                    .json({ message: "Planid or Postid is invalid" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "internal server error" });
        }
    }
);

router.post("/createplan", async (req, res, next) => {
    const plan = new planModel({
        name: "Diamond",
        posts: [],
        contentCreators: [],
        subscribers: [],
        threshold: 5000
    });
    await plan.save();
    return res.json({ message: "created" });
});

router.post(
    "/showcategories/:id",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        try {
            const plan = await planModel.findById(req.params.id);

            if (plan) {
                var categories = [];
                plan.posts.forEach(i => {
                    console.log(i.category);
                    console.log("safgsruih");
                    categories.push(i.category);
                });
                // console.log(categories);
                return res.json(categories);
            } else {
                return res.json({ message: "Plan not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
);

router.post(
    "/showposts/:id",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        try {
            const plan = await planModel.findById(req.params.id);
            // console.log(plan);

            if (plan) {
                const posts = [];
                // plan.posts.forEach(async i => {
                //     const post = await postModel.findById(i.id);
                //     console.log(post);
                //     console.log(post.category, req.body.category);
                // if (
                //     JSON.stringify(post.category) ==
                //     JSON.stringify(req.body.category)
                // ) {
                //     console.log("eafsag");
                //     posts.push(post);
                //     console.log(posts);
                //     console.log("kufdgkfudhuk");
                // }
                // });

                for (var i = 0; i < plan.posts.length; i++) {
                    const post = await postModel.findById(plan.posts[i].id);
                    if (
                        JSON.stringify(post.category) ==
                        JSON.stringify(req.body.category)
                    ) {
                        console.log("eafsag");
                        posts.push(post);
                        console.log(posts);
                        console.log("kufdgkfudhuk");
                    }
                }

                // plan.save();
                console.log("eafdafdyuagdfjklfd<sjkfgyudj");
                console.log(posts);
                return res.json(posts);
            } else {
                return res.status(400).json({ message: "Plan not found" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
);

module.exports = router;
