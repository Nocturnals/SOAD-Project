const express = require("express");

const { OrganizationSchema } = require("../../models/Organizations");
const { NotificationSchema } = require("../../models/Notifications");
const { OtheruserModel } = require("../../models/Otheruser");
const post = require("../../models/Post");
const UserModel = require("../../models/user");
const { organizationValidation } = require("./organValidation");
const { verifyToken, verifyUserWithToken } = require("../auth/helper");

// instance of router
const router = express.Router();

router.get("/allOrganizaions", (req, res) => {
  res.json(UserModel.organizations);
});

router.post(
  "/Organization/:type",
  create,
  verifyToken,
  verifyUserWithToken,
  async (req, res) => {
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
    const createOrganization = new OrganizationSchema({
      _id: mongoose.Types.ObjectId(),
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

      // return success message
      return res.status(200).json({
        message: "Successfully created Organization",
        doc: doc
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post(
  "adduser/:type",
  adduser,
  verifyToken,
  verifyUserWithToken,
  async (req, res) => {
    // format:
    // organizationId:""
    // userId:""

    try {
      const currentUser = await UserModel.findById(req.loggedUser._id);
      const currentorganization = await currentUser.find(
        (organizations = req.body.organizationId)
      );

      const findUser = await OtheruserModel.findById(req.body.userId);
      currentorganization.PendingUsers.push(findUser);

      //TODO send request to User
      const createNotifiaction = new NotificationSchema({
        message:
          "new Organizatoion wants to add you " + currentorganization.name
      });
      await createNotifiaction.save();

      const requestUser = await UserModel.findById(req.body.userId);
      requestUser.notifications.push(createNotifiaction);

      const doc = await requestUser.save();

      return res.status(200).json({
        message: "Successfully send notification to User",
        doc: doc
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post(
  "deleteOrganization/:type",
  deleteOrganization,
  verifyToken,
  verifyUserWithToken,
  async (req, res) => {
    // format
    // userId:
    // orgName:

    try {
      var removeElement = null;
      const currentUser = await UserModel.findById(req.loggedUser._id);
      allOrganization = currentUser.organizations;
      for (i = 0; i < allOrganization.length(); i++) {
        if (allOrganization[i].name == req.body.orgName) {
          removeElement = i;
        }
      }

      currentUser.organizations.slice(i, i + 1);
      await currentUser.save();

      const currentorganization = await OrganizationSchema.find(
        (name = req.body.orgName)
      );
      await currentorganization.remove();
      // currentorganization.(currentorganization._id);
      return res.status(200).json({
        message: "Successfully delected Organization",
        doc: doc
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Internal server error or cant find Organization" });
    }
  }
);
