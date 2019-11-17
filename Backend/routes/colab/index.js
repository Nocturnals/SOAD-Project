const express = require("express");

const artistTypes = require("../../models/artistTypes");
const jobsAppliedModel = require("../../models/jobsApplied");
const artistWantedModel = require("../../models/artistsWanted");
const { OtheruserModel } = require("../../models/Otheruser");
const { getArtistType } = require("./helper");
const { verifyToken, verifyUserWithToken } = require("../auth/helper");
const {
    interestedInWorkValidation,
    artistWantedValidation,
    applyJobValidation
} = require("./bodyValidations");

// instance of router
const router = express.Router();

// route to get all types of artists
router.get("/allTypes", (req, res) => {
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
        const user = new OtheruserModel({
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
        const jobProvider = new OtheruserModel({
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
            descriptionOfJob: req.body.descriptionOfJob,
            workAt: req.body.workAt
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
        try {
            // fetch the database to get all works of type artists
            const allArtistsInterested = await jobsAppliedModel
                .find()
                .where({ artistType: req.artistType });
            return res.json(allArtistsInterested);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
);

// route to get all the avaliable artists for work
router.get(
    "/getAvailableArtistForWork/:type/:area",
    getArtistType,
    async (req, res) => {
        try {
            // fetch the database to get all works of type artists
            const allArtistsInterested = await jobsAppliedModel.find().where({
                artistType: req.artistType,
                availableAt: req.params.area
            });
            return res.json(allArtistsInterested);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
);

// route to get all job offers for all different artist
router.get("/getJobOffers/:type", getArtistType, async (req, res) => {
    try {
        // fetches the database to get all job offers for a particular artist type
        const allJobOffers = await artistWantedModel
            .find()
            .where({ artistType: req.artistType });

        return res.status(200).json(allJobOffers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// route to get all job offers for all different artist
router.get("/getJobOffers/:type/:area", getArtistType, async (req, res) => {
    try {
        // fetches the database to get all job offers for a particular artist type
        const allJobOffers = await artistWantedModel.find().where({
            artistType: req.artistType,
            workAt: req.params.area
        });

        return res.status(200).json(allJobOffers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// route for appling for a job offer
router.post("/applyJob", verifyToken, verifyUserWithToken, async (req, res) => {
    const validatedData = applyJobValidation(res.body);

    if (validatedData.error) {
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });
    }

    // apply for job
});

module.exports = router;
