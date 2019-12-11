const express = require("express");

const { OtheruserModel } = require("../../models/Otheruser");
const post = require("../../models/Post");
const UserModel = require("../../models/user");
const { verifyToken, verifyUserWithToken } = require("../auth/helper");

// instance of router
const router = express.Router();

router.post("/:type", verifyToken, verifyUserWithToken, async (req, res) => {
  // format
  // dateofbirth:""
  // primaryinterest:""
  // otherinterest:""
  // profileurl:""
  // coverphotourl:""
  // profilephotourl:""
  try {
    const currentUser = await UserModel.findById(req.loggedUser._id);
    currentUser.dataofbirth = req.body.dataofbirth;
    currentUser.primaryinterest = req.body.primaryinterest;
    currentUser.otherinterest = req.body.otherinterest;
    return res.status(200).json({
      message: "Successfully edited profile"
      // doc: doc
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

module.exports = router;
