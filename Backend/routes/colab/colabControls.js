const JobsAvailableModel = require("../../models/jobsApplied");
const UserModel = require("../../models/user");
const { OtheruserModel } = require("../../models/Otheruser");
const {
    JobOffersModel,
    otherJobOfferModel
} = require("../../models/artistsWanted");
const FileLocModel = require("../../models/fileLocModel");
const {
    interestedInWorkValidation,
    artistWantedValidation,
    applyJobValidation,
    findJobOffersValidation
} = require("./bodyValidations");

exports.InterstedInWork = async (req, res) => {
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

    const fileUrl = req.fileURL.url;
    const fileName = req.fileURL.name;

    const fileLocDoc = new FileLocModel({
        url: fileUrl,
        name: fileName
    });

    // create the new jogapplied model
    const jobAvailable = new JobsAvailableModel({
        legalName: req.body.legalName,
        email: req.body.email,
        address: req.body.address,
        artistType: req.body.artistType,
        user: user,
        availableLocation: req.body.availableLocation,
        availableFrom: req.body.availableFrom,
        availableTill: req.body.availableTill,
        portfolioSite: req.body.portfolioSite,
        resumeLoc: fileLocDoc
    });

    // save the new doc to database
    try {
        // saving to database
        const currentUser = await UserModel.findById(req.loggedUser._id);
        currentUser.jobsAvailableFor.push(jobAvailable);

        const doc = await currentUser.save();

        // return success message
        return res.status(200).json({
            message: "Successfully created job oppurtunity",
            loggedUser: doc
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.createJobOffer = async (req, res) => {
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

    try {
        // create artist wanted model
        const jobOffer = new JobOffersModel({
            artistType: req.body.artistType.toLowerCase(),
            title: req.body.title,
            jobProvider: jobProvider,
            workAt: req.body.workAt,
            workDuration: req.body.workDuration,
            workType: req.body.workType,
            salary: req.body.salary,
            descriptionOfJob: req.body.descriptionOfJob,
            qualifications: req.body.qualifications,
            responsibilities: req.body.responsibilities
        });

        const doc = await jobOffer.save();

        const currentUser = await UserModel.findById(req.loggedUser._id);

        const newOtherJobOffer = new otherJobOfferModel({
            _id: doc._id,
            artistType: doc.artistType,
            title: doc.title,
            jobProvider: doc.jobProvider,
            salary: doc.salary,
            status: "pending"
        });

        currentUser.jobsOffered.push(newOtherJobOffer);
        const updatedUser = await currentUser.save();
        return res.status(200).json({
            message: "Successfully created job offer",
            doc: doc,
            loggedUser: updatedUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getJobByID = async (req, res) => {
    if (req.params.id !== null) {
        try {
            // gets the document with id
            const jobOfferDoc = await JobOffersModel.findById(req.params.id);
            if (jobOfferDoc == null) {
                return res
                    .status(400)
                    .json({ message: "No Job exists with such id" });
            }

            return res.json(jobOfferDoc);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

exports.getAllArtistsOfType = async (req, res) => {
    try {
        // fetch the database to get all works of type artists
        const allArtistsAvailable = await JobsAvailableModel.find().where({
            artistType: req.artistType
        });
        return res.json(allArtistsAvailable);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllArtistsOfTypeAndArea = async (req, res) => {
    try {
        // fetch the database to get all works of type artists
        const allArtistsAvailable = await JobsAvailableModel.find().where({
            artistType: req.artistType,
            availableAt: req.params.area
        });
        return res.json(allArtistsAvailable);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getJobOffersWithOptions = async (req, res) => {
    console.log(req.body);
    const validateData = findJobOffersValidation(req.body);

    // if error return error response
    if (validateData.error) {
        return res
            .status(400)
            .json({ message: validateData.error.details[0].message });
    }

    try {
        // find the jobs based on the sepcified options
        const jobsList = await JobOffersModel.find({
            workAt: { $regex: req.body.options.workAt.toLowerCase() },
            artistType: { $regex: req.body.options.artistType.toLowerCase() },
            workType: { $in: req.body.options.workTypes }
        });

        return res.json(jobsList);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllJobOffersOfType = async (req, res) => {
    try {
        // fetches the database to get all job offers for a particular artist type
        const allJobOffers = await JobOffersModel.find().where({
            artistType: req.artistType
        });

        return res.status(200).json(allJobOffers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllJobOffersOfTypeAndArea = async (req, res) => {
    try {
        // fetches the database to get all job offers for a particular artist type
        const allJobOffers = await JobOffersModel.find().where({
            artistType: req.artistType,
            workAt: req.params.area
        });

        return res.status(200).json(allJobOffers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.applyForJob = async (req, res) => {
    const validatedData = applyJobValidation(res.body);
    // console.log(validatedData);

    if (validatedData.error) {
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });
    }

    try {
        // apply for job
        const jobOfferDoc = await JobOffersModel.findById(req.body.jobOfferId);
        if (jobOfferDoc) {
            // check if already applied
            jobOfferDoc.applied.forEach(participatent => {
                if (
                    JSON.stringify(participatent._id) ==
                    JSON.stringify(req.loggedUser._id)
                ) {
                    return res
                        .status(200)
                        .json({ message: "already registered for the job" });
                }
            });

            // apply for that job
            const newOtheruser = new OtheruserModel({
                _id: req.loggedUser._id,
                username: req.loggedUser.name,
                profileurl: req.loggedUser.profileurl
            });

            // push the new other user to the list of appliedusers
            jobOfferDoc.applied.push(newOtheruser);
            const UpdatedOfferdoc = await jobOfferDoc.save();

            // add the otherJobOffer schema to the user list of appliedjobs
            const newOtherJobOffer = new otherJobOfferModel({
                _id: jobOfferDoc._id,
                title: jobOfferDoc.title,
                artistType: jobOfferDoc.artistType.toLowerCase(),
                jobProvider: jobOfferDoc.jobProvider,
                salary: jobOfferDoc.salary,
                status: "pending"
            });

            const currentUser = await UserModel.findById(req.loggedUser._id);

            currentUser.jobsApplied.push(newOtherJobOffer);
            await currentUser.save();

            return res
                .status(200)
                .json({ jobOfferDoc: UpdatedOfferdoc, user: req.loggedUser });
        } else {
            return res.status(400).json({ message: "Invalid jobOffer id" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};