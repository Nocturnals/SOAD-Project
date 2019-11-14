const mongoose = require("mongoose");
const otheruserschema = require("./Otheruser");
const othercompetititonschema = require("./Othercompetitions");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 255,
    trim: true
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024,
    trim: true
  },
  dateJoined: {
    type: Date,
    default: Date.now
  },
  dateofbirth: {
    type: Date
  },

  primaryinterest: {
    enum: ["cat1", "cat2"],
    type: String
  },

  otherinterest: {
    enum: ["cat1", "cat2"],
    type: String
  },

  lastactive: {
    type: Date
  },

  profileurl: {
    type: String,
    default: "defalutPic"
  },

  coverphotourl: {
    type: String
  },

  profilephotourl: {
    type: String
  },

  competitionsparticipated: {
    type: [othercompetititonschema]
  },

  competitionsparticipating: {
    type: [othercompetititonschema]
  },

  followers: {
    type: [otheruserschema]
  },

  following: {
    type: [otheruserschema]
  },

  emailVerified: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
