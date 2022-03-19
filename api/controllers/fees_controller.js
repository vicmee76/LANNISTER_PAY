const helpers = require("../../helpers/response");
const FeesModel = require("../models/fees_model");

const {
    _clearError,
    _sendError,
    _checkFeeEntity,
    _compareCurrencyOrFeeEntityOrLocal,
    _compareEntityProperty
} = require("../../helpers/validator");

const {
    _feesMiddleWearAction, _feesMiddleWearAction,
    _getAppliedFee,
    _getchargeAmount,
    _getsettlementAmount } = require("../middleware/fees_middleware");


let _feesResult = [];

exports._feesController = async (req, res) => {
    try {
        _feesResult = null;

        const data = req.body;
        if (data === null || data.FeeConfigurationSpec === "")
            helpers._showError(res, 400, "Fees configuration spec cannot be null");
        let feesConfigSpec = data.FeeConfigurationSpec.split("\n");
        let _feesValidationResults = await _feesMiddleWearAction(feesConfigSpec, res);

        if (_sendError().length > 0) {
            helpers._showError(res, 500, _sendError());
        }
        else {
            if (_feesValidationResults.length > 0) {

                await FeesModel.deleteMany();
                await FeesModel.insertMany(_feesValidationResults)
                    .then(result => {
                        if (result.length > 0) {
                            _feesResult = result;
                            res.status(200).json({
                                "status": "ok"
                            });
                        }
                        else {
                            res.status(200).json({
                                "Error": "Something went wron trying to save this record"
                            });
                        }
                    }).catch(err => {
                        res.status(500).json({
                            "Error": err
                        });
                    });
            }
            else {
                helpers._showError(res, 500, "Fees configuration spec result is empty");
            }
        }
        _clearError();
    }
    catch (e) {
        helpers._showError(res, 500, e.message);
    }
};




exports._ComputeTransactionFees = async (req, res) => {
    try {
        const data = req.body;
        let Customers = data.Customers;
        let PaymentEntity = data.PaymentEntity;
        let payCurrency = data.Currency;
        let foundFee = [];
        let payEntity = _checkFeeEntity(PaymentEntity.Type);
        let payLocale = data.CurrencyCountry === PaymentEntity.Country ? "LOCL" : "INTL";

        let feesLength = _feesResult.length;

        //FeesModel.find(
        //    {
        //        $and: [
        //            { $or: [{ FeeCurrency: payCurrency }, { FeeCurrency: "*" }] },
        //            { $or: [{ FeeEntity: payEntity }, { FeeEntity: "*" }] },
        //            { $or: [{ FeeLocale: payLocale }, { FeeLocale: "*" }] },
        //            { $or: [{ EntityProperty: PaymentEntity.Issuer }, { EntityProperty: PaymentEntity.Brand }, { EntityProperty: PaymentEntity.Number }, { EntityProperty: PaymentEntity.SixID }, { EntityProperty: "*" }] },
        //        ]
        //    }
        //)
        //    .select("-_id -__v")
        //    .exec()
        //    .then(result => {
        //        helpers._showError(res, 500, result);
        //    })
        //    .catch();

        if (feesLength > 0) {
            if (data.Amount >= 0) {
                if (_sendError().length > 0) {
                    helpers._showError(res, 500, _sendError());
                }
                else {
                    for (let i = 0; i < feesLength; i++) {

                        let hasCurrency = _compareCurrencyOrFeeEntityOrLocal(_feesResult[i]["FeeCurrency"], payCurrency, "*");
                        let hasFeeEntity = _compareCurrencyOrFeeEntityOrLocal(_feesResult[i]["FeeEntity"], payEntity, "*");
                        let hasLocal = _compareCurrencyOrFeeEntityOrLocal(_feesResult[i]["FeeLocale"], payLocale, "*");;
                        let hasFeeEntityProperty = _compareEntityProperty(_feesResult[i]["EntityProperty"], PaymentEntity, "*");

                        if (hasCurrency === true && hasFeeEntity === true && hasLocal === true && hasFeeEntityProperty === true) {
                            foundFee.push(_feesResult[i]);
                        }
                    }
                    if (foundFee.length > 0) {
                       
                    }
                    else {
                        helpers._showError(res, 500, "No payment template was found for this payload");
                    }
                }
            }
            else {
                helpers._showError(res, 500, "Invalid amount entered");
            }
        }
        else {
            helpers._showError(res, 500, "Please call the fees end point before calling the compute endpoint");
        }
        _clearError();

    } catch (e) {
        helpers._showError(res, 500, e.message);
    }
}
