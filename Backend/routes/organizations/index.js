const express = require("express");

const { OrganizationModel } = require("../../models/Organizations");
const { NotificationsModel } = require("../../models/Notifications");
const { OtheruserModel } = require("../../models/Otheruser");
const post = require("../../models/Post");
const UserModel = require("../../models/user");
const {
    organizationValidation,
    requestUserValidation,
    addUserValidation,
    deleteValidation,
    findOrganizationValidation
} = require("./organValidation");
const { verifyToken, verifyUserWithToken } = require("../auth/helper");

// instance of router
const router = express.Router();

router.get("/getall", verifyToken, verifyUserWithToken, async (req, res) => {
    res.json(req.loggedUser.organizations);
});

router.post("/getOrganization", async (req, res) => {
    // Format
    // orgName:""

    try {
        const getOrganization = await OrganizationModel.find().where({
            name: req.body.orgName
        });
        return res.status(200).json({
            message: "Successfully send notification to User",
            doc: getOrganization
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Could not find orgnaization" });
    }
});

router.post("/create", verifyToken, verifyUserWithToken, async (req, res) => {
    // format:
    // name:
    // description:

    // apply as avaliable to work
    const validatedData = organizationValidation(req.body);

    // if error with validation return error
    if (validatedData.error) {
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });
    }
    const adminUser = new OtheruserModel({
        _id: req.loggedUser._id,
        username: req.loggedUser.name,
        profileurl: req.loggedUser.profileurl
    });
    const createOrganization = new OrganizationModel({
        name: req.body.name,
        description: req.body.description,
        adminUsers: adminUser
    });

    await createOrganization.save();

    // save the new doc to database
    try {
        // saving to database
        const currentUser = await UserModel.findById(req.loggedUser._id);
        currentUser.organizations.push(createOrganization);

        const doc = await currentUser.save();

        return res.status(200).json({
            message: "Successfully send notification to User",
            doc: doc
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post(
    "/requestusers",
    verifyToken,
    verifyUserWithToken,
    async (req, res) => {
        // format:
        // organizationId:""
        // userIds:""

        const validatedData = requestUserValidation(res.body);
        console.log(validatedData);

        if (validatedData.error) {
            return res
                .status(400)
                .json({ message: validatedData.error.details[0].message });
        }

        try {
            // const currentUser = await UserModel.findById(req.loggedUser._id);
            const currentorganization = await OrganizationModel.findById(
                req.body.organizationId
            );

            for (i = 0; i < req.body.userIds.length; i++) {
                const requestUser = await UserModel.findById(
                    req.body.userIds[i]
                );

                const findUser = new OtheruserModel({
                    _id: requestUser._id,
                    username: requestUser.name,
                    profileurl: requestUser.profileurl
                });
                currentorganization.PendingUsers.push(findUser);

                //TODO send request to User
                const createNotifiaction = new NotificationsModel({
                    userId: req.body.userIds,
                    message:
                        "new Organizatoion wants to add you " +
                        currentorganization.name
                });
                // await createNotifiaction.save();
                requestUser.notifications.push(createNotifiaction);
                await requestUser.save();
                await currentorganization.save();
            }
            // const doc = await requestUser.save();
            return res.status(200).json({
                message: "Successfully send notification to User"
                // doc: doc
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
);

router.post("/adduser", verifyToken, verifyUserWithToken, async (req, res) => {
    // format
    // userId:
    // orgName:
    // check:

    const validatedData = addUserValidation(res.body);
    console.log(validatedData);

    if (validatedData.error) {
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });
    }

    if (req.body.check) {
        for (i = 0; i < req.loggedUser.organizations.length; i++) {
            if (req.loggedUser.organizations[i].name == req.body.orgName) {
                return res.status(200).json({
                    message: "Already in organization"
                });
            }
        }

        try {
            const logUser = await UserModel.findById(req.loggedUser._id);

            const requestedUser = new OtheruserModel({
                _id: req.loggedUser._id,
                username: req.loggedUser.name,
                profileurl: req.loggedUser.profileurl
            });

            const findOrganization = await OrganizationModel.find().where({
                name: req.body.orgName
            });
            const findOrganizationNotList = findOrganization[0];

            logUser.organizations.push(findOrganizationNotList);
            findOrganizationNotList.Users.push(requestedUser);

            console.log("this is User : " + requestedUser);
            console.log("this is org : " + findOrganizationNotList.Users);

            const doc_User = await logUser.save();
            const doc_organization = await findOrganizationNotList.save();

            return res.status(200).json({
                message: "Successfully send notification to User",
                doc_User: doc_User,
                doc_organization: doc_organization
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    } else {
        try {
            const findOrganization = await OrganizationModel.find().where({
                name: req.body.orgName
            });
            for (i = 0; i < findOrganization.PendingUsers.length; i++) {
                if (findOrganization.PendingUsers._id == req.body.userId) {
                    findOrganization.PendingUsers.slice(i, i + 1);
                }
            }
            const doc = findOrganization.save();
            return res.status(200).json({
                message: "Successfully rejected notification from User",
                doc: doc
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
});

router.post("/editOrg", verifyToken, verifyUserWithToken, async (req, res) => {
    // format
    // orgName:
    // description:

    try {
        const findOrganization = await OrganizationModel.find().where({
            name: req.body.orgName
        });

        console.log(
            req.loggedUser._id + " " + findOrganization[0].adminUsers[0]._id
        );

        if (req.loggedUser.username == findOrganization[0].adminUsers[0].name) {
            console.log("hey you");
            console.log(
                req.loggedUser._id + " " + findOrganization[0].adminUsers[0]._id
            );
            findOrganization[0].description = req.body.description;
            const doc = findOrganization[0].save();
            return res.status(200).json({
                message: "Successfully edited from User",
                doc: doc
            });
        } else {
            return res.status(400).json({
                message: "The User is not admin"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/delete", verifyToken, verifyUserWithToken, async (req, res) => {
    // format
    // userId:
    // orgName:

    const validatedData = deleteValidation(res.body);
    console.log(validatedData);

    if (validatedData.error) {
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });
    }

    try {
        // var removeElement = null;
        const currentUser = await UserModel.findById(req.loggedUser._id);
        allOrganization = currentUser.organizations;
        for (i = 0; i < allOrganization.length; i++) {
            if (allOrganization[i].name == req.body.orgName) {
                // removeElement = i;
                currentUser.organizations.splice(i, 1);
                await currentUser.save();
            }
        }

        const currentorganization = await OrganizationModel.find().where({
            name: req.body.orgName
        });
        const usersList = currentorganization[0].Users;
        for (i = 0; i < usersList.length; i++) {
            console.log(usersList[i]);
            const user = await UserModel.findById(usersList[i]._id);
            organizationList = user.organizations;
            console.log(organizationList);
            for (i = 0; i < organizationList.length; i++) {
                if (organizationList[i].name == req.body.orgName) {
                    // removeElement = i;
                    user.organizations.splice(i, 1);
                    await user.save();
                    console.log(user);
                }
            }
        }

        // const doc = await currentorganization.deleteOne();
        // currentorganization.(currentorganization._id);
        return res.status(200).json({
            message: "Successfully delected Organization"
            // doc: doc
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error or cant find Organization"
        });
    }
});

router.get("/findOrganizationMatch/:name", async (req, res) => {
    // validate data
    const validateData = findOrganizationValidation(req.params);
    if (validateData.error) {
        return res
            .status(400)
            .json({ message: validateData.error.details[0].message });
    }

    // find the user which matches
    try {
        const reqTime = Date.now();

        const organizationsList = await OrganizationModel.find({
            name: { $regex: req.params.name }
        });

        const result = {
            organisationsList: organizationsList,
            reqTime: reqTime
        };
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = router;
