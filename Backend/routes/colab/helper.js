const artistTypes = require("../../models/artistTypes");

function getArtistType(req, res, next) {
    let flag = false;
    artistTypes.forEach(type => {
        if (
            JSON.stringify(type).toLowerCase() ==
            JSON.stringify(req.params.type).toLowerCase()
        ) {
            flag = true;
            req.artistType = type;
        }
    });
    if (flag) {
        next();
    } else {
        return res.status(400).json({ message: "Invalid artist type" });
    }
}

module.exports = { getArtistType };
