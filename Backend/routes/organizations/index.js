const express = require("express");

const { OrganizationModel } = require("../../models/Organizations");
const { NotificationSchema } = require("../../models/Notifications");
const { OtheruserModel } = require("../../models/Otheruser");
const post = require("../../models/Post");
const UserModel = require("../../models/user");
const { organizationValidation } = require("./organValidation");
const { verifyToken, verifyUserWithToken } = require("../auth/helper");

// instance of router
const router = express.Router();

router.get("/getall", verifyToken, verifyUserWithToken, async (req, res) => {
  res.json(req.loggedUser.organizations);
});

router.post("/create", verifyToken, verifyUserWithToken, async (req, res) => {
  // format:
  // name:
  // description:

  console.log(req.body);

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
  "requestusers/:type",
  verifyToken,
  verifyUserWithToken,
  async (req, res) => {
    // format:
    // organizationId:""
    // userIds:""

    try {
      const currentUser = await UserModel.findById(req.loggedUser._id);
      const currentorganization = await currentUser.find(
        (organizations = req.body.organizationId)
      );

      for (i = 0; i < req.body.userIds.length; i++) {
        const findUser = await OtheruserModel.findById(req.body.userIds[i]);
        currentorganization.PendingUsers.push(findUser);

        //TODO send request to User
        const createNotifiaction = new NotificationSchema({
          userId: req.body.organizationId,
          message:
            "new Organizatoion wants to add you " + currentorganization.name
        });
        // await createNotifiaction.save();

        const requestUser = await UserModel.findById(req.body.userIds[i]);
        requestUser.notifications.push(createNotifiaction);

        const doc = await requestUser.save();
      }
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

router.post("/adduser", verifyToken, verifyUserWithToken, async (req, res) => {
  // format
  // userId:
  // orgName:
  // check:
  if (check) {
    try {
      const requestedUser = await UserModel.findById(req.loggedUser._id);
      const findOrganization = await OrganizationModel.find((name = orgName));
      requestedUser.organizations.push(findOrganization);
      findOrganization.Users.push(requestedUser);
      const doc_User = await requestedUser.save();
      const doc_organization = await findOrganization.save();
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
      const findOrganization = await OrganizationModel.find((name = orgName));
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

router.post(
  "/makeAdmin",
  verifyToken,
  verifyUserWithToken,
  async (req, res) => {}
);

// router.post(
//   "/requestuser",
//   verifyToken,
//   verifyUserWithToken,
//   async (req, res) => {
//     // format:
//     // organizationId:""
//     // userIds:""

//     try {
//       const currentUser = await UserModel.findById(req.loggedUser._id);
//       const currentorganization = await currentUser.find(
//         (organizations = req.body.organizationId)
//       );

//       const findUser = await OtheruserModel.findById(req.body.userId);
//       currentorganization.PendingUsers.push(findUser);

//       //TODO send request to User
//       const createNotifiaction = new NotificationSchema({
//         message:
//           "new Organizatoion wants to add you " + currentorganization.name
//       });
//       await createNotifiaction.save();

//       const requestUser = await UserModel.findById(req.body.userId);
//       requestUser.notifications.push(createNotifiaction);

//       const doc = await requestUser.save();

//       return res.status(200).json({
//         message: "Successfully send notification to User",
//         doc: doc
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   }
// );

router.post("/delete", verifyToken, verifyUserWithToken, async (req, res) => {
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

    const currentorganization = await OrganizationModel.find(
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
    return res.status(500).json({
      message: "Internal server error or cant find Organization"
    });
  }
});
module.exports = router;
