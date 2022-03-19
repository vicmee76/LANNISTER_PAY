const helpers = require("../../helpers/response");

const {
    _checkFeesId,
    _checkFeesCurrency,
    _checkFeeLocale,
    _checkFeeEntity,
    _otherChecks,
    _checkFeeType,
    _checkFeeValue,
    _calculateFeeType
} = require("../../helpers/validator");


const _feesMiddleWearAction = async (feesSpecs, res) => {
    let feeSpecData = [];
    let feesResult = [];

    if (feesSpecs.length > 0) {
        let specLength = feesSpecs.length;
        for (let i = 0; i < specLength; i++) {
            feeSpecData.push(feesSpecs[i]);
        }

        let itemLength = feeSpecData.length;
        for (let i = 0; i < itemLength; i++) {
            let item = feeSpecData[i].split(' ');
            let feeId = _checkFeesId(item[0], res);
            let curreny = _checkFeesCurrency(item[1].toUpperCase(), res);
            let feeLocale = _checkFeeLocale(item[2].toUpperCase(), res);
            let firstIndex = item[3].indexOf('(');
            let secondIndex = item[3].indexOf(')');
            let transFirstFormEntity = item[3].slice(0, firstIndex);
            let feeEntity = _checkFeeEntity(transFirstFormEntity.toUpperCase(), res);
            let entityProperty = item[3].slice(firstIndex + 1, secondIndex);
            _otherChecks(item[4], res); // check for :
            _otherChecks(item[5].toUpperCase(), res); // check for APPLY
            let feeType = _checkFeeType(item[6].toUpperCase(), res);
            let feeValue;
            let percValue;
            if (item[7].includes(":")) {
                let values = item[7].split(':');
                feeValue = _checkFeeValue(values[0]);
                percValue = _checkFeeValue(values[1]);
            }
            else {
                feeValue = _checkFeeValue(item[7]);
            }
            feesResult.push({
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

        // sort array by accending order 1,2....n
        feesResult.sort(function (first, second) {
            return first.Specific - second.Specific;
        });
        return await feesResult;
    }
    else {
        helpers._showError(res, 500, "Fees configuration spec is null");
    }
}



const _getAppliedFee = async (amount, feeType, feeValue, percValue) => {
    return appliedFee = _calculateFeeType(feeType, feeValue, percValue, amount);
}


const _getchargeAmount = async (bearsFees, amount) => {
    return chargeAmount = bearsFees === true ? amount + appliedFee : amount;
}


const _getsettlementAmount = async (chargeAmount, appliedFee) => {
    return settlementAmount = chargeAmount - appliedFee;
}


module.exports = {
    _feesMiddleWearAction,
    _getAppliedFee,
    _getchargeAmount,
    _getsettlementAmount
};
