const express = require("express");
const { verifyToken, verifyUserWithToken } = require("../auth/helper");
const router = express.Router();
planModel = require("./../../models/Subcriptions");
postModel = require("./../../models/Post");
planpostModel = require("./../../models/Subcriptions");
const UserModel = require("./../../models/user");
const { OtheruserModel } = require("./../../models/Otheruser");
const {addtoplanValidation} = require("./serviceValidation")


router.post(
    "/showallplans",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        // const user = req.loggedUser;

        try {
            const plans = await planModel.find().select("name");
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
            const user = new OtheruserModel({
                _id: req.loggedUser._id,
                username: req.loggedUser.name,
                profileurl: req.loggedUser.profileurl
            });

            const plan = await planModel.findById(req.params.id);
            if (plan) {
                plan.subscribers.push(user);
                plan.save();
                return res.send(plan);
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
        try {
            const user = await UserModel.findById(req.loggedUser._id);
            const contentCreator = new OtheruserModel({
                _id: req.loggedUser._id,
                username: req.loggedUser.name,
                profileurl: req.loggedUser.profileurl
            });
            const plan = await planModel.findById(req.params.id);
            if (user.followers.length >= plan.threshold) {
                plan.contentCreators.push(contentCreator);
                plan.save();
                return res.send(plan);
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
            var flag = false;
            const post = await postModel.findById(req.body.postid);
            console.log(post);
            var planflag = false;

            const plan = await planModel.findById(req.params.id);
            console.log(plan.contentCreators.length);
            plan.contentCreators.forEach(i => {
                if (i._id == req.loggedUser._id) {
                    planflag = true;
                }
            });
            console.log(planflag);
            console.log(req.loggedUser._id, post.owner[0]._id);
            if (
                JSON.stringify(req.loggedUser._id) ==
                    JSON.stringify(post.owner._id) &&
                planflag &&
                post.isPrivate
            ) {
                const planpost = new planpostModel({
                    id: post._id,
                    title: post.title,
                    description: post.description,
                    category: post.category
                });
                plan.posts.push(planpost);
                return res.send(plan);
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
        name: "bronze",
        posts: [],
        contentCreators: [],
        subscribers: [],
        threshold: 100
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
                return res.send(plan.category);
            } else {
                return res.json({ message: "Plan not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
);

router.post(
    "/showposts/:id/category",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        try {
            const plan = await planModel.findById(req.params.id);

            if (plan) {
            
                var posts = []
                plan.posts.forEach(i => {
                    const post = await postModel.findById(i._id)
                    if(post.category == req.params.category){
                    posts.push(post);
                 }
                })


                return res.send(posts);
            } else {
                return res.json({ message: "Plan not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
);

module.exports = router;
