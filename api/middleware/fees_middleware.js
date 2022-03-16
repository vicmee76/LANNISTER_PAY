const helpers = require("../../helpers/response");

const { _checkFeesId,
    _checkFeesCurrency,
    _checkFeeLocale,
    _checkFeeEntity
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

            let firstIndex = item[3].indexOf("(");
            let secondIndex = item[3].indexOf(")");
            let transFirstFormEntity = item[3].slice(0, firstIndex);
            
            let feeEntity = _checkFeeEntity(transFirstFormEntity.toUpperCase(), res);
            let entityProperty = item[3].slice(firstIndex + 1, secondIndex);

            console.log(entityProperty);
            
        }
    }
    else {

    }
}

module.exports = { _feesMiddleWearAction };
