const { addfollowerValidation } = require("./bodyValidation");

exports.addFollower = async (req, res) => {
    // validate the body format data
    const validatedData = addfollowerValidation(req.body);

    // if error with validation return error
    if (validatedData.error) {
        return res
            .status(400)
            .json({ message: validatedData.error.details[0].message });
    }
};
