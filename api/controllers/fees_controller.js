const helpers = require("../../helpers/response");
const { _clearError, _sendError } = require("../../helpers/validator");
const { _feesMiddleWearAction } = require("../middleware/fees_middleware");

let _feesResult;

exports._feesController = async (req, res) => {
    try {
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

    } catch (e) {

    }

}
