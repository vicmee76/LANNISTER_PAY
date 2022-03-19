const helpers = require("../../helpers/response");
const { _feesMiddleWearAction } = require("../middleware/fees_middleware");

const {
    _clearError,
    _sendError,
    _checkFeesCurrency,
    _checkFeeEntity
} = require("../../helpers/validator");


let _feesResult=[];

exports._feesController = async (req, res) => {
    try {
        _feesResult = null;
        const data = req.body;
        if (data === null || data.FeeConfigurationSpec === "")
            helpers._showError(res, 400, "Fees configuration spec cannot be null");
        let feesConfigSpec = data.FeeConfigurationSpec.split("\n");
         _feesResult = await _feesMiddleWearAction(feesConfigSpec, res);

        if (_sendError().length > 0) {
            helpers._showError(res, 500, _sendError());
            _clearError();
        }
        else {
            return res.status(200).json({
                "status": "ok"
            });
        }
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

        let feesLength = _feesResult.length;
        
        if (data.Amount >= 0) {
            let payCurrency = _checkFeesCurrency(data.Currency);

            let issuer = PaymentEntity.Issuer;
            let brand = PaymentEntity.Brand;
            let number = PaymentEntity.Number;
            let sixID = PaymentEntity.SixID;

            let foundFee = [];
               
                if (payCurrency == data.Currency) {
                    let payEntity = _checkFeeEntity(PaymentEntity.Type);
                    let payLocale = data.CurrencyCountry === PaymentEntity.Country ? "LOCL" : "INTL";

                    if (_sendError().length > 0) {
                        _clearError();
                        helpers._showError(res, 500, _sendError());
                    }
                    else {
                        for (let i = 0; i < feesLength; i++) {

                            let hasCurrency = false;
                            let hasFeeEntity = false;
                            let hasLocal = false;
                            let hasFeeEntityProperty = false;

                            if (_feesResult[i]["FeeCurrency"] === payCurrency || _feesResult[i]["FeeCurrency"] === "*")
                                hasCurrency = true;
                            if (_feesResult[i]["FeeEntity"] === payEntity || _feesResult[i]["FeeEntity"] === "*")
                                hasFeeEntity = true;
                            if (_feesResult[i]["FeeLocale"] === payLocale || _feesResult[i]["FeeLocale"] === "*")
                                hasLocal = true;
                            if (_feesResult[i]["EntityProperty"] === issuer || _feesResult[i]["EntityProperty"] === brand || _feesResult[i]["EntityProperty"] === number || _feesResult[i]["EntityProperty"] === sixID || _feesResult[i]["EntityProperty"] === "*")
                                hasFeeEntityProperty = true;

                            if (hasCurrency === true && hasFeeEntity === true && hasLocal === true && hasFeeEntityProperty === true) {
                                foundFee.push({
                                    "FeeId": _feesResult[i]["FeeId"],
                                    "Specific": _feesResult[i]["Specific"],
                                    "FeeId": feeId,
                                    "FeeCurrency": curreny,
                                    "FeeLocale": feeLocale,
                                    "FeeEntity": feeEntity,
                                    "EntityProperty": entityProperty,
                                    "FeeType": feeType,
                                    "FeeValue": feeValue,
                                    "PercValue": percValue === undefined ? null : percValue,
                                    "Specific": feeSpecData[i].split('*').length - 1
                                });
                            }
                        }

                        helpers._showError(res, 500, foundFee[0]["FeeId"]);
                    }
                }
                else {
                    // currency error
                    helpers._showError(res, 500, payCurrency);
                }
            }
            else {
                // error int amount
                helpers._showError(res, 500, "Invalid amount");
            }
        
    } catch (e) {
        helpers._showError(res, 500, e.message);
    }

}
