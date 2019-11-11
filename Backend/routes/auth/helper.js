const jwt = require("jsonwebtoken");

const UserModel = require("../../models/user");

// verify the token for authentication
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];

    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
        // Split the header
        const bearer = bearerHeader.split(" ");
        // Get the token
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;

        // run the next function
        next();
    } else {
        res.status(401).json({ message: "Access Denied" });
    }
}

const verifyUserWithToken = async (req, res, next) => {
    // verifies the given token is correct and gets the user data
    jwt.verify(req.token, process.env.Token_Secret, async (err, authData) => {
        if (err) {
            console.log(`Error at verifying jwt token: ${err}`);
            return res.status(401).json({ message: "Access Denied" });
        } else {
            try {
                const loggedUser = await UserModel.findById({
                    _id: authData._id
                }).select("-password");

                // if user doesn't exist
                if (!loggedUser) {
                    return res.status(400).json({
                        message: "No user exists with given id"
                    });
                }

                // when user exists
                else {
                    req.loggedUser = loggedUser;
                    next();
                }
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Error finding user" });
            }
        }
    });
};

module.exports = { verifyToken, verifyUserWithToken };
