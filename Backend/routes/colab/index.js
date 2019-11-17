const express = require("express");

const artistTypes = require("../../models/artistTypes");
const jobsAppliedModel = require("../../models/jobsApplied");
const artistWantedModel = require("../../models/artistsWanted");
const { otherUserModel } = require("../../models/Otheruser");
const { getArtistType } = require("./helper");
const { verifyToken, verifyUserWithToken } = require("../auth/helper");
const {
    interestedInWorkValidation,
    artistWantedValidation
} = require("./bodyValidations");

// instance of router
const router = express.Router();

router.get("/getAllTypes", (req, res) => {
    res.json(artistTypes);
});

// route to apply for a interested in working by a valid user
router.post(
    "/interestedInWork/:type",
    getArtistType,
    verifyToken,
    verifyUserWithToken,
    async (req, res) => {
        // apply as avaliable to work
        const validatedData = interestedInWorkValidation(req.body);

        // if error with validation return error
        if (validatedData.error) {
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });
        }

        // create a other user model with current user
        const user = new otherUserModel({
            _id: req.loggedUser._id,
            username: req.loggedUser.name,
            profileurl: req.loggedUser.profileurl
        });

        // create the new jogapplied model
        const jobApplied = new jobsAppliedModel({
            artistType: req.artistType,
            user: user,
            availableAt: req.body.availableAt,
            freeTimeFrom: req.body.freeTimeFrom,
            freeTimeTill: req.body.freeTimeTill,
            portpolioSite: req.body.portpolioSite || ""
        });

        // save the new doc to database
        try {
            // saving to database
            const doc = await jobApplied.save();

            // return success message
            return res.status(200).json({
                message: "Successfully created job oppurtunity",
                doc: doc
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
);

// route to post a job wanted request
router.post(
    "/artistWanted/:type",
    getArtistType,
    verifyToken,
    verifyUserWithToken,
    async (req, res) => {
        // validate the body contents
        const validatedData = artistWantedValidation(req.body);

        // if error return error response
        if (validatedData.error) {
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });
        }

        // create other user model of logged user
        const jobProvider = new otherUserModel({
            _id: req.loggedUser._id,
            username: req.loggedUser.name,
            profileurl: req.loggedUser.profileurl
        });

        // create artist wanted model
        const artistWanted = new artistWantedModel({
            artistType: req.artistType,
            jobProvider: jobProvider,
            workDuration: req.body.workDuration,
            salary: req.body.salary,
            descriptionOfJob: req.body.descriptionOfJob
        });

        try {
            const doc = await artistWanted.save();
            return res
                .status(200)
                .json({ message: "Successfully created job offer", doc: doc });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "internal server error" });
        }
    }
);

// route to get all the avaliable artists for work
router.get(
    "/getAvailableArtistForWork/:type",
    getArtistType,
    async (req, res) => {
        // fetch the database to get all works of type artists
        const allArtistsInterested = await jobsAppliedModel
            .find()
            .where({ artistType: req.artistType });
        return res.json(allArtistsInterested);
    }
);

module.exports = router;
