const express = require("express");
const { verifyToken, verifyUserWithToken } = require("./../auth/helper");
const CompetiitonsModel = require("./../../models/Competititons");
const UserModel = require("./../../models/user");
const {
  CompRegisterValidation,
  CompCreateValidation,
  deleteValidation,
  editValidation,
  hostValidation
} = require("./compValidation");

const router = express.Router();

router.get("/allcompetitions", (req, res) => {
  var title = CompetiitonsModel.find().select("title");

  return res.status(200).json({ title });
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
      var comp = await CompetiitonsModel.findById({
        _id: req.body.compid
      });

      comp.participants.append({
        id: req.loggedUser._id,
        username: req.loggedUser.username,
        profileurl: req.loggedUser.profileurl
      });

      comp.noofparticipants = comp.nooofparticipants + 1;

      return res.json({ message: "sucessfully registered" });
    } catch (error) {
      return res.status(500).json({ message: "Competiiton not found" });
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
    // comp.participants.append({
    //     id : user._id,
    //     username : user.username,
    //     profileurl : user.profileurl
    // })

    const comp = new CompetiitonsModel({
      title: req.body.title,
      shortdescription: req.body.shortdescription,
      fulldescription: req.body.fulldescription,
      starttime: req.body.starttime,
      endtime: req.body.endtime,
      // hosts : hosts.append({
      //     id :user._id,
      //     username : user.username,
      //     profileurl : user.profileurl
      // })
      hosts: [
        {
          _id: user._id,
          username: user.name,
          profileurl: user.profileurl || "random string"
        }
      ],
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

router.post(
  "/:id",
  verifyToken,
  verifyUserWithToken,
  async (req, res, next) => {
    try {
      const comp = await CompetiitonsModel.findById({
        _id: req.params.id
      });
      return comp;
    } catch (error) {
      return res.status(500).json({ message: "Competiiton not found" });
    }
  }
);

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
      var comp = await CompetiitonsModel.findByIdAndRemove({
        _id: req.body.compid
      });
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

    const comp = await CompetiitonsModel.findById({
      _id: req.body.compid
    });
    var flag = 0;
    comp.hosts.forEach(i => {
      if (i._id == req.loggedUser._id) {
        flag = 1;
      }
    });
    if (flag) {
      try {
        comp.updateone(
          { id: req.params.id },
          {
            $set: { title: req.body.title }
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
    const comp = await CompetiitonsModel.findById({
      _id: req.body.compid
    });

    comp.hosts.forEach(i => {
      if (i._id == req.loggedUser._id) {
        ishost = true;
      }
    });

    if (ishost) {
      const user = UserModel.findById({
        _id: req.body.userid
      });
      comp.hosts.append({
        id: user._id,
        username: user.username,
        profileurl: user.profileurl
      });
    }
    res.json({ message: "host added succesfully!" });
  }
);

module.exports = router;

// router.post("/fetchtop10/:id" , verifyToken , verifyUserWithToken , (req,res,next) => {
//     try{
//         var comp = await  CompetiitonsModel.findById({
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
