
const { _showError } = require("./response");

const FEE_LOCALE = ['LOCL', 'INTL', '*'];
const FEE_ENTITY = ['CREDIT-CARD', 'DEBIT-CARD', 'BANK-ACCOUNT', 'USSD', 'WALLET-ID', '*']


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



module.exports = { _checkFeesId, _checkFeesCurrency, _checkFeeLocale, _checkFeeEntity };