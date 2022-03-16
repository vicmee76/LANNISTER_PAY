const helpers = require("../../helpers/response");

const { _checkFeesId,
    _checkFeesCurrency,
    _checkFeeLocale
} = require("../../helpers/validator");


const _feesMiddleWearAction = async (feesSpecs, res) => {

    let feeSpecData = [];

    if (feesSpecs.length > 0) {

        for (let i = 0; i < feesSpecs.length; i++) {
            feeSpecData.push(feesSpecs[i]);
        }

        for (let i = 0; i < feeSpecData.length; i++) {
            let item = feeSpecData[i].split(" ");

            let feeId = _checkFeesId(item[0], res);
            let curreny = _checkFeesCurrency(item[1].toUpperCase(), res);
            let feeLocale = _checkFeeLocale(item[2].toUpperCase(), res);
        }
    }
    else {

    }
}

module.exports = { _feesMiddleWearAction };
