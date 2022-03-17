
const { _showError } = require("./response");

const FEE_LOCALE = ['LOCL', 'INTL', '*'];
const FEE_ENTITY = ['CREDIT-CARD', 'DEBIT-CARD', 'BANK-ACCOUNT', 'USSD', 'WALLET-ID', '*'];
const FEE_TYPE = ['FLAT', 'PERC', 'FLAT_PERC'];


const  _checkFeesId = (feesId, res) => {
    if (feesId.length === 8 && feesId.match(/^[0-9a-zA-Z]+$/)) {
        return feesId;
    }
    else {
         _showError(res, 400, `Invalid fees ${feesId}`);
    }
}


const _checkFeesCurrency = (feeCurrency, res) => {
    if (feeCurrency.length === 3 && (feeCurrency === "NGN" || feeCurrency === "*")) {
        return feeCurrency;
    }
    else {
         _showError(res, 400, `Invalid currency ${feeCurrency}`);
    }
}


const _checkFeeLocale = (feeLocale, res) => {
    if (FEE_LOCALE.includes(feeLocale)) {
        return feeLocale;
    }
    else {
        _showError(res, 400, `Invalid fee locale ${feeLocale}`);
    }
}

const _checkFeeEntity = (feeEntity, res) => {
    if (FEE_ENTITY.includes(feeEntity)) {
        return feeEntity;
    }
    else {
        _showError(res, 400, `Invalid fee entity ${feeEntity}`);
    }
}



const _otherChecks = (item, res) => {
    if (item === ":" || item == "APPLY") {
        return true;
    }
    else {
        _showError(res, 400, `Invalid item ${item}`);
    }
}


const _checkFeeType = (feeType, res) => {
    if (FEE_TYPE.includes(feeType)) {
        return feeType;
    }
    else {
        _showError(res, 400, `Invalid item ${feeType}`);
    }
}


const _checkFeeValue = (feeValue, res) => {
    if (feeValue >= 0) {
        return feeValue;
    }
    else {
        _showError(res, 400, `Invalid fee value ${feeValue}`);
    }
}


module.exports =
{
    _checkFeesId,
    _checkFeesCurrency,
    _checkFeeLocale,
    _checkFeeEntity,
    _otherChecks,
    _checkFeeType,
    _checkFeeValue
};