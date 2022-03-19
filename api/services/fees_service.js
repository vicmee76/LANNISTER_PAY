const mongoose = require("mongoose");
const FeesModel = require("../models/fees_model");


exports._feesService = async (feesResults) => {
    await FeesModel.deleteMany();
    await FeesModel.insertMany(feesResults)
        .then(result => {
            return result;
        }).catch(err => {
            return err;
        });
}


