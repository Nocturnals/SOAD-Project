const express = require("express");
const Multer = require("multer");

const artistTypes = require("../../models/artistTypes");
const { getArtistType } = require("./helper");
const { verifyToken, verifyUserWithToken } = require("../auth/helper");

const colabControls = require("./colabControls");

// instance of router
const router = express.Router();

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024 // no larger than 50mb, you can change as needed.
    }
});

// ----------------- routes start here ------------------------
// route to get all types of artists
router.get("/allTypes", (req, res) => {
    return res.json(artistTypes);
});

// route to apply for a interested in working by a valid user
router.post(
    "/interestedInWork",
    verifyToken,
    verifyUserWithToken,
    multer.single("file"),
    colabControls.InterstedInWork
);

// route to post a job offer request
router.post(
    "/jobOffer",
    verifyToken,
    verifyUserWithToken,
    colabControls.createJobOffer
);

// route to get the job offer with the id given
router.get("/jobOffer/:id", colabControls.getJobByID);

// route to get all the avaliable artists for work
router.get(
    "/artistForWork/:type",
    getArtistType,
    colabControls.getAllArtistsOfType
);

// route to get all the avaliable artists for work
router.get(
    "/artistForWork/:type/:area",
    getArtistType,
    colabControls.getAllArtistsOfTypeAndArea
);

// route to get jobOffers with options
router.post("/jobOffers", colabControls.getJobOffersWithOptions);

// route to get all job offers for all different artist
router.get(
    "/jobOffers/:type",
    getArtistType,
    colabControls.getAllJobOffersOfType
);

// route to get all job offers for all different artist
router.get(
    "/JobOffers/:type/:area",
    getArtistType,
    colabControls.getAllJobOffersOfTypeAndArea
);

// route for appling for a job offer
router.post(
    "/applyJob",
    verifyToken,
    verifyUserWithToken,
    colabControls.applyForJob
);

module.exports = router;
