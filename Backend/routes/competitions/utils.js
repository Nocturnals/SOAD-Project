const express = require("express");
const { verifyToken, verifyUserWithToken } = require("./../auth/helper");
const CompetitionsModel = require("./../../models/Competititons");
const { faqModel, resultsModel } = require("./../../models/Competititons");
const { OtheruserModel } = require("../../models/Otheruser");
const { ReplyModel, CommentsModel } = require("../../models/Comments");
const UserModel = require("./../../models/user");
const { UpdateCompetition } = require("./helper");

const {
    CompRegisterValidation,
    CompCreateValidation,
    deleteValidation,
    editValidation,
    hostValidation,
    resultValidation,
    editcategoryValidation,
    editendtimeValidation,
    editfulldescriptionValidation,
    editprizeValidation,
    editrulesValidation,
    editshortdescriptionValidation,
    editstarttimeValidation,
    edittitleValidation,
    editfaqValidation,
    editresultsValidation,
    addcommentValidation,
    editcommentValidation
} = require("./compValidation");

const router = express.Router();

router.get("/allcompetitions", async (req, res) => {
    try {
        const titles = await CompetitionsModel.find().select(
            "title , shortdescription"
        );
        console.log(titles);
        return res.status(200).json({ titles });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
});

router.post(
    "/register",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        const validatedData = CompRegisterValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        try {
            const comp = await CompetitionsModel.findById(req.body._id);

            comp.participants[comp.noofparticipants] = {
                id: req.loggedUser._id,
                username: req.loggedUser.username,
                profileurl: req.loggedUser.profileurl
            };

            comp.noofparticipants = comp.noofparticipants + 1;

            console.log(comp.noofparticipants);
            return res.json({ message: "sucessfully registered" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Competition not found" });
        }
    }
);

router.post(
    "/createcompetition",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        const validatedData = CompCreateValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        user = req.loggedUser;
        console.log(user);

        const comp = new CompetitionsModel({
            title: req.body.title,
            shortdescription: req.body.shortdescription,
            fulldescription: req.body.fulldescription,
            starttime: req.body.starttime,
            endtime: req.body.endtime,
            hosts: [
                {
                    _id: user._id,
                    username: user.name,
                    profileurl: user.profileurl || "random string"
                }
            ],
            category: req.body.category,
            prize: req.body.prize,
            rules: req.body.rules
        });

        try {
            const savedcomp = await comp.save();
            res.json(savedcomp);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }
);

// retrieve a comp

router.get("/:id", verifyToken, verifyUserWithToken, async (req, res, next) => {
    try {
        const comp = await CompetitionsModel.findById(req.params.id);
        if (comp) {
            return res.status(200).json(comp);
        } else {
            return res.status(400).json({ message: "competition not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// delete a competition

router.delete(
    "/delete",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        const validatedData = deleteValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        try {
            var comp = await CompetitionsModel.findByIdAndRemove(req.body._id);
            return res.json(comp);
        } catch (error) {
            return res.status(500).json({ message: "Competiiton not found" });
        }
    }
);

router.patch(
    "/edit/:compid/title",
    verifyToken,
    verifyUserWithToken,
    UpdateCompetition,
    async (req, res, next) => {
        const validatedData = edittitleValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        try {
            // const comp = await CompetitionsModel.findById(req.body._id);
            const comp = req.comp;
            comp.title = req.body.title;
            await comp.save();
            return res.json(comp);
        } catch (error) {
            console.log(error);
            return res.json({ message: " failed  to update competitiion" });
        }
    }
);

router.patch(
    "/edit/:compid/shortdescription",
    verifyToken,
    verifyUserWithToken,
    UpdateCompetition,
    async (req, res, next) => {
        const validatedData = editshortdescriptionValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        try {
            // const comp = await CompetitionsModel.findById(req.body._id);
            const comp = req.comp;
            comp.shortdescription = req.body.shortdescription;
            await comp.save();
            return res.json(comp);
        } catch (error) {
            console.log(error);
            return res.json({ message: " failed  to update competitiion" });
        }
    }
);

router.patch(
    "/edit/:compid/fulldescription",
    verifyToken,
    verifyUserWithToken,
    UpdateCompetition,
    async (req, res, next) => {
        const validatedData = editfulldescriptionValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        try {
            // const comp = await CompetitionsModel.findById(req.body._id);
            const comp = req.comp;
            comp.fulldescription = req.body.fulldescription;
            await comp.save();
            return res.json(comp);
        } catch (error) {
            console.log(error);
            return res.json({ message: " failed  to update competitiion" });
        }
    }
);

router.patch(
    "/edit/:compid/starttime",
    verifyToken,
    verifyUserWithToken,
    UpdateCompetition,
    async (req, res, next) => {
        const validatedData = editstarttimeValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        try {
            // const comp = await CompetitionsModel.findById(req.body._id);
            const comp = req.comp;
            comp.starttime = req.body.starttime;
            await comp.save();
            return res.json(comp);
        } catch (error) {
            console.log(error);
            return res.json({ message: " failed  to update competitiion" });
        }
    }
);

router.patch(
    "/edit/:compid/endtime",
    verifyToken,
    verifyUserWithToken,
    UpdateCompetition,
    async (req, res, next) => {
        const validatedData = editendtimeValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        try {
            // const comp = await CompetitionsModel.findById(req.body._id);
            const comp = req.comp;
            comp.endtime = req.body.endtime;
            await comp.save();
            return res.json(comp);
        } catch (error) {
            console.log(error);
            return res.json({ message: " failed  to update competitiion" });
        }
    }
);

router.patch(
    "/edit/:compid/rules",
    verifyToken,
    verifyUserWithToken,
    UpdateCompetition,
    async (req, res, next) => {
        const validatedData = editrulesValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        try {
            // const comp = await CompetitionsModel.findById(req.body._id);
            const comp = req.comp;
            comp.rules = req.body.rules;
            await comp.save();
            return res.json(comp);
        } catch (error) {
            console.log(error);
            return res.json({ message: " failed  to update competitiion" });
        }
    }
);

router.patch(
    "/edit/:compid/prize",
    verifyToken,
    verifyUserWithToken,
    UpdateCompetition,
    async (req, res, next) => {
        const validatedData = editprizeValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        try {
            // const comp = await CompetitionsModel.findById(req.body._id);
            const comp = req.comp;
            comp.prize = req.body.prize;
            await comp.save();
            return res.json(comp);
        } catch (error) {
            console.log(error);
            return res.json({ message: " failed  to update competitiion" });
        }
    }
);

router.patch(
    "/edit/:compid/category",
    verifyToken,
    verifyUserWithToken,
    UpdateCompetition,
    async (req, res, next) => {
        const validatedData = editcategoryValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        try {
            // const comp = await CompetitionsModel.findById(req.body._id);
            const comp = req.comp;
            comp.category = req.body.category;
            await comp.save();
            return res.json(comp);
        } catch (error) {
            console.log(error);
            return res.json({ message: " failed  to update competitiion" });
        }
    }
);

router.patch(
    "/edit/:compid/faqs",
    verifyToken,
    verifyUserWithToken,
    UpdateCompetition,
    async (req, res, next) => {
        const validatedData = editfaqValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        try {
            // const comp = await CompetitionsModel.findById(req.body._id);
            const comp = req.comp;
            const faq = new faqModel({
                question: req.body.question,
                answer: req.body.answer
            });
            if (!comp.faqs) {
                // comp.faqs = [];
            }
            const faqlength = comp.faqs.length;
            comp.faqs[faqlength] = faq;
            await comp.save();
            return res.json(comp);
        } catch (error) {
            console.log(error);
            return res.json({ message: " failed  to update competitiion" });
        }
    }
);

// router.patch(
//     "/edit/:compid/comments",
//     verifyToken,
//     verifyUserWithToken,
//     UpdateCompetition,
//     async (req, res, next) => {
//         try {
//             // const comp = await CompetitionsModel.findById(req.body._id);
//             const comp = req.comp;

//             comp.comments = req.body.comments;
//             await comp.save();
//             return res.json(comp);
//         } catch (error) {
//             console.log(error);
//             return res.json({ message: " failed  to update competitiion" });
//         }
//     }
// );

// router.patch(
//     "/edit/:compid/top10",
//     verifyToken,
//     verifyUserWithToken,
//     UpdateCompetition,
//     async (req, res, next) => {
//         try {
//             // const comp = await CompetitionsModel.findById(req.body._id);
//             const comp = req.comp;
//             const top10 = new resultsModel({
//                 id: req.body.userid,
//                 name: req.body.name,
//                 score: req.body.score,
//                 time: req.body.time
//             });
//             if (!comp.results) {
//                 // comp.faqs = [];
//             }
//             const top10length = comp.top10.length;
//             comp.top10[top10length] = top10;
//             await comp.save();
//             await comp.save();
//             return res.json(comp);
//         } catch (error) {
//             console.log(error);
//             return res.json({ message: " failed  to update competitiion" });
//         }
//     }
// );

router.patch(
    "/edit/:compid/results",
    verifyToken,
    verifyUserWithToken,
    UpdateCompetition,
    async (req, res, next) => {
        const validatedData = editresultsValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        try {
            // const comp = await CompetitionsModel.findById(req.body._id);
            const comp = req.comp;
            const results = new resultsModel({
                id: req.body.id,
                name: req.body.name,
                score: req.body.score,
                time: req.body.time
            });
            if (!comp.results) {
                // comp.faqs = [];
            }
            const resultslength = comp.results.length;
            comp.results[resultslength] = results;
            await comp.save();
            return res.json(comp);
        } catch (error) {
            console.log(error);
            return res.json({ message: " failed  to update competitiion" });
        }
    }
);

router.patch(
    "/edit/:id/addcomment",
    verifyToken,
    verifyUserWithToken,
    UpdateCompetition,
    async (req, res, next) => {
        const validatedData = addcommentValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        try {
            // const comp = await CompetitionsModel.findById(req.body._id);
            const comp = req.comp;

            const otheruser = new OtheruserModel({
                _id: req.loggedUser._id,
                username: req.loggedUser.username,
                profileurl: req.loggedUser.profileurl
            });

            const comment = new CommentsModel({
                owner: otheruser,
                message: req.body.message,
                likes: req.body.likes
                // *************************** leiked by>*********************
                // likedby: req.body.likedby
            });

            const commentslength = comp.comments.length;

            comp.comments[commentslength] = comment;

            await comp.save();
            return res.json(comp);
        } catch (error) {
            console.log(error);
            return res.json({ message: " failed  to update competitiion" });
        }
    }
);

router.patch(
    "/edit/:id/editcomment",
    verifyToken,
    verifyUserWithToken,
    UpdateCompetition,
    async (req, res, next) => {
        const validatedData = editcommentValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        try {
            // const comp = await CompetitionsModel.findById(req.body._id);
            const comp = req.comp;

            var flag = false;
            comp.hosts.forEach(i => {
                if (
                    JSON.stringify(i._id) ==
                        JSON.stringify(req.loggedUser._id) ||
                    JSON.stringify(comp.comments.owner._id) ==
                        JSON.stringify(req.loggedUser._id)
                ) {
                    flag = true;
                } else {
                    return res
                        .status(401)
                        .json({ message: "You cannot edit the comment" });
                }
            });

            if (flag) {
                const comment = await CompetitionsModel.findById(
                    req.body.commentid
                );
                comment.message = req.body.message;
            } else {
                return res
                    .status(401)
                    .json({ message: "You cannot edit the comment" });
            }
            await comp.save();
            return res.json(comp);
        } catch (error) {
            console.log(error);
            return res.json({ message: " failed  to update competitiion" });
        }
    }
);

router.patch(
    "/edit/:id/deleteallcomments",
    verifyToken,
    verifyUserWithToken,
    UpdateCompetition,
    async (req, res, next) => {
        try {
            // const comp = await CompetitionsModel.findById(req.body._id);
            const comp = req.comp;

            var flag = false;
            comp.hosts.forEach(i => {
                if (
                    JSON.stringify(i._id) == JSON.stringify(req.loggedUser._id)
                ) {
                    flag = true;
                } else {
                    return res
                        .status(401)
                        .json({ message: "You cannot delete the comment" });
                }
            });

            if (flag) {
                comp.comments = [];
            } else {
                return res
                    .status(401)
                    .json({ message: "You cannot delete the comment" });
            }
            await comp.save();
            return res.json(comp);
        } catch (error) {
            console.log(error);
            return res.json({ message: " failed  to update competitiion" });
        }
    }
);

router.patch(
    "/edit/:id/deletecomment",
    verifyToken,
    verifyUserWithToken,
    UpdateCompetition,
    async (req, res, next) => {
        try {
            // const comp = await CompetitionsModel.findById(req.body._id);
            const comp = req.comp;

            var flag = false;
            comp.hosts.forEach(i => {
                if (
                    JSON.stringify(i._id) ==
                        JSON.stringify(req.loggedUser._id) ||
                    JSON.stringify(comp.comments.owner._id) ==
                        JSON.stringify(req.loggedUser._id)
                ) {
                    flag = true;
                } else {
                    return res
                        .status(401)
                        .json({ message: "You cannot delete all comments" });
                }
            });

            if (flag) {
                // ***************************************************************************************
                comp.comments = [];
            } else {
                return res
                    .status(401)
                    .json({ message: "You cannot delete the comment" });
            }
            await comp.save();
            return res.json(comp);
        } catch (error) {
            console.log(error);
            return res.json({ message: " failed  to update competitiion" });
        }
    }
);

// ************************************** top10 ***********************************

// how to add a host

router.post(
    "/addhost",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        const validatedData = hostValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });
        try {
            var ishost = false;
            const comp = await CompetitionsModel.findById(req.body._id);

            comp.hosts.forEach(i => {
                if (
                    JSON.stringify(i._id) == JSON.stringify(req.loggedUser._id)
                ) {
                    ishost = true;
                }
            });

            if (ishost) {
                const user = UserModel.findById(req.body.userid);

                const noofhosts = comp.hosts.length;

                comp.hosts[noofhosts] = {
                    id: user._id,
                    username: user.username,
                    profileurl: user.profileurl
                };

                res.send(comp);
            } else {
                console.log(ishost);
                console.log(comp);
                res.json({ message: "You cannot add a host" });
            }
        } catch (error) {
            console.log(error);
            return res.json({ message: " Access denied" });
        }
    }
);

// get results

router.get(
    "/results",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        const validatedData = resultValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });
        try {
            var ishost = false;
            const comp = await CompetitionsModel.findById(req.body._id);

            comp.hosts.forEach(i => {
                if (i._id == req.loggedUser._id) {
                    ishost = true;
                }
            });

            if (ishost) {
                const user = UserModel.findById(req.body.userid);
                // *******************************************checkthis**************************************************
                const results = new resultsModel({
                    id: req.body.id,
                    name: req.body.name,
                    score: req.body.score,
                    time: req.body.time
                });
                if (!comp.results) {
                    // comp.faqs = [];
                }
                const resultslength = comp.results.length;
                comp.results[resultslength] = results;
                await comp.save();
                return res.json(comp);
            } else {
                return res.json({ message: "Access denied" });
            }
        } catch (error) {
            return express
                .status(500)
                .json({ message: "internal server error" });
        }
    }
);

module.exports = router;
