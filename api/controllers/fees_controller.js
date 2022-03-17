const { Binary } = require("mongodb");
const helpers = require("../../helpers/response");
const { _feesMiddleWearAction } = require("../middleware/fees_middleware");


exports._postFeesController = async (req, res) => {
    try {
        const data = req.body;
        if (data === null || data.FeeConfigurationSpec === "")
            helpers._showError(res, 400, "Fees configuration spec cannot be null");
        let feesConfigSpec = data.FeeConfigurationSpec.split("\n");
        let _feesResult = await _feesMiddleWearAction(feesConfigSpec, res);
        if (_feesResult.length > 0) {
            console.table(_feesResult);
            return res.status(200).json({
                "status": "ok"
            });
        }
        else {
            helpers._showError(res, 500, "Something went wrong tring to validate fees configuration spec.");
        }
    }
    catch (e) {
        helpers._showError(res, 500, e.message);
    }
    
};

    6
5       7
