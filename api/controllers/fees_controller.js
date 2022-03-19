const helpers = require("../../helpers/response");
const { _feesMiddleWearAction } = require("../middleware/fees_middleware");

const {
    _clearError,
    _sendError,
    _checkFeesCurrency,
    _checkFeeEntity,
    compareCurrencyOrFeeEntityOrLocal,
    compareEntityProperty
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
        }
        else {
            return res.status(200).json({
                "status": "ok"
            });
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
        let feesLength = _feesResult.length;
        let payCurrency = data.Currency;
        let foundFee = [];
        let payEntity = _checkFeeEntity(PaymentEntity.Type);
        let payLocale = data.CurrencyCountry === PaymentEntity.Country ? "LOCL" : "INTL";

        if (feesLength > 0) {
            if (data.Amount >= 0) {
                if (_sendError().length > 0) {
                    helpers._showError(res, 500, _sendError());
                }
                else {
                    for (let i = 0; i < feesLength; i++) {

                        let hasCurrency = compareCurrencyOrFeeEntityOrLocal(_feesResult[i]["FeeCurrency"], payCurrency, "*");
                        let hasFeeEntity = compareCurrencyOrFeeEntityOrLocal(_feesResult[i]["FeeEntity"], payEntity, "*");
                        let hasLocal = compareCurrencyOrFeeEntityOrLocal(_feesResult[i]["FeeLocale"], payLocale, "*");;
                        let hasFeeEntityProperty = compareEntityProperty(_feesResult[i]["EntityProperty"], PaymentEntity, "*");

                        if (hasCurrency === true && hasFeeEntity === true && hasLocal === true && hasFeeEntityProperty === true) {
                            foundFee.push(_feesResult[i]);
                        }
                    }
                    if (foundFee.length > 0) {


                        helpers._showError(res, 500, foundFee[0]["FeeId"]);
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
            helpers._showError(res, 500, "Please call the fees endpoint first.");
        }
        _clearError();
    } catch (e) {
        helpers._showError(res, 500, e.message);
    }
}
