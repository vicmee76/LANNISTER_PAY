const helpers = require("../../helpers/response");
const { _feesMiddleWearAction } = require("../middleware/fees_middleware");


exports._postFeesController = async (req, res) => {
    try {
        const data = req.body;

        if (data === null || data.FeeConfigurationSpec === "" || data.FeeConfigurationSpec === null)
            helpers._showError(res, 400, "Fees configuration spec cannot be null");

        let feesConfigSpec = data.FeeConfigurationSpec.split("\n");
        let _feesResult = _feesMiddleWearAction(feesConfigSpec, res);

    }
    catch (e) {
        helpers._showError(res, 500, e);
    }
    
};