const UserModel = require("../../models/user");
const { OtheruserModel } = require("../../models/Otheruser");
const { addfollowerValidation } = require("./bodyValidation");

exports.addFollowing = async (req, res) => {
    // validate the body format data
    const validatedData = addfollowerValidation(req.body);

    // if error with validation return error
    if (validatedData.error) {
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });
    }

    try {
        // chech if the userid is same for the logged user
        if (req.loggedUser._id.toString() === req.body.otherUserId)
            return res.status(400).json({ message: "Can't follow youself" });

        const LoggedUser = await UserModel.findById(req.loggedUser._id);
        const followedByUser = await UserModel.findById(req.body.otherUserId);

        // check for the otherUser existance
        if (!followedByUser) {
            return res.status(400).json({ message: "Invalid userId" });
        }

        // check if already follows second user
        LoggedUser.following.forEach(user => {
            if (user._id.toString() === followedByUser._id.toString())
                return res.status(400).json({
                    message: `Already following the ${followedByUser.name}`
                });
        });

        // add followerByuser to loggeduser following list
        const otherFollowedByUser = new OtheruserModel({
            _id: followedByUser._id,
            username: followedByUser.name,
            profileurl: followedByUser.profileurl
        });

        const otherLoggedUser = new OtheruserModel({
            _id: req.loggedUser._id,
            username: req.loggedUser.name,
            profileurl: req.loggedUser.profileurl
        });

        LoggedUser.following.push(otherFollowedByUser);
        followedByUser.followers.push(otherLoggedUser);
        const newLoggedUser = await LoggedUser.save();
        await followedByUser.save();

        return res.status(200).json({ loggedUser: newLoggedUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
