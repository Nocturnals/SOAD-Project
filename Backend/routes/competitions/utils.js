const express = require("express");
const { verifyToken, verifyUserWithToken } = require("./../auth/helper");
const CompetitionsModel = require("./../../models/Competititons");
const UserModel = require("./../../models/user");
const {
    CompRegisterValidation,
    CompCreateValidation,
    deleteValidation,
    editValidation,
    hostValidation,
    resultValidation
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
            const comp = await CompetitionsModel.findById(req.body.compid);

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
            var comp = await CompetitionsModel.findByIdAndRemove(
                req.body.compid
            );
            return res.json(comp);
        } catch (error) {
            return res.status(500).json({ message: "Competiiton not found" });
        }
    }
);

// update a competition

router.patch(
    "/edit",
    verifyToken,
    verifyUserWithToken,
    async (req, res, next) => {
        const validatedData = editValidation(req.body);
        if (validatedData.error)
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });

        const comp = await CompetitionsModel.findById(req.body.compid);
        var flag = 0;
        comp.hosts.forEach(i => {
            if (i._id == req.loggedUser._id) {
                flag = 1;
            }
        });
        if (flag) {
            try {
                comp.updateone(
                    { id: req.body.id },
                    {
                        $set: {
                            shortdescription: req.body.shortdescription,
                            title: req.body.title,
                            fulldescription: req.body.fulldescription,
                            rules: req.body.rules,
                            prize: req.body.prize,
                            category: req.body.category,
                            starttime: req.body.starttime,
                            endtime: req.body.endtime
                        }
                    }
                );

                res.json(comp);
            } catch (error) {
                res.json({ message: " failed  to update competitiion" });
            }
        }
    }
);

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

        var ishost = false;
        const comp = await CompetitionsModel.findById(req.body.compid);

        comp.hosts.forEach(i => {
            if (i._id == req.loggedUser._id) {
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
        }
        console.log(ishost);
        console.log(comp);
        res.json({ message: "You cannot add a host" });
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

        var ishost = false;
        const comp = await CompetitionsModel.findById(req.body.compid);

        comp.hosts.forEach(i => {
            if (i._id == req.loggedUser._id) {
                ishost = true;
            }
        });

        if (ishost) {
            const user = UserModel.findById({
                _id: req.body.userid
            });
            // *******************************************checkthis**************************************************
            comp.results.append({
                results: req.body.results
            });
            res.send(comp);
        }
    }
);

module.exports = router;

// router.post("/fetchtop10/:id" , verifyToken , verifyUserWithToken , (req,res,next) => {
//     try{
//         var comp = await  CompetitionsModel.findById({
//         _id : req.params.id,

//         comp.top10 =
//     }
// })

// function top10(){
//     results.find().sort().limit(10)
// }

// function remaining_time(){
//     return starttime - now
// }
