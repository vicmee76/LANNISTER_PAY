const mongoose = require("mongoose");

const feesSchema = mongoose.Schema({
    FeeId: String,
    FeeCurrency: String,
    FeeLocale: String,
    FeeEntity: String,
    EntityProperty: String,
    FeeType: String,
    FeeValue: Number,
    PercValue: Number,
    Specific: Number
});

module.exports = mongoose.model("FeesModel", feesSchema);