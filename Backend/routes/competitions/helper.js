const express = require("express");
const CompetitionsModel = require("./../../models/Competititons");

async function UpdateCompetition(req, res, next) {
    // const validatedData = editValidation(req.body);
    // if (validatedData.error)
    //     return res
    //         .status(400)
    //         .json({ message: validatedData.error.details[0].message });

    const comp = await CompetitionsModel.findById(req.params.compid);
    if (!comp) {
        return res.status(400).json({ message: "competition not found" });
    }
    req.comp = comp;
    var flag = false;
    comp.hosts.forEach(i => {
        if (JSON.stringify(i._id) == JSON.stringify(req.loggedUser._id)) {
            flag = true;
        }
    });

    if (flag) {
        next();
    } else {
        return res.status(401).json({ message: "Access denied" });
    }
}

module.exports = { UpdateCompetition };
