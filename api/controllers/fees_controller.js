const helpers = require("../../helpers/response");
const { _feesMiddleWearAction } = require("../middleware/fees_middleware");

const {
    _clearError,
    _sendError,
    _checkFeesCurrency,
    _checkFeeEntity
} = require("../../helpers/validator");


let _feesResult;

exports._feesController = async (req, res) => {
    try {
        _feesResult = null;
        const data = req.body;
        if (data === null || data.FeeConfigurationSpec === "")
            helpers._showError(res, 400, "Fees configuration spec cannot be null");
        let feesConfigSpec = data.FeeConfigurationSpec.split("\n");
         _feesResult = await _feesMiddleWearAction(feesConfigSpec, res);

        if (_sendError().length > 0) {
            _clearError();
            helpers._showError(res, 500, _feesResult);
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

        if (data == null) {

            if (data.Amount >= 0) {
                let payCurreny = _checkFeesCurrency(data.Curreny);

                if (payCurreny == data.Curreny) {
                        let payType = _checkFeeEntity(PaymentEntity.Type);
                        let payLocale = data.CurrencyCountry === PaymentEntity.Country ? "LOCL" : "INTL";

                    if (_sendError().length > 0) {
                        _clearError();
                        helpers._showError(res, 500, _feesResult);
                    }
                    else {
                        return res.status(200).json({
                            "status": "ok"
                        });
                    }

                   
                }
                else {
                    // currency error
                }
            }
            else {
                // error int amount
            }
        }
        else {
            //error data null
        }
    } catch (e) {

    }

}
