
const FEE_LOCALE = ['LOCL', 'INTL', '*'];
const FEE_ENTITY = ['CREDIT-CARD', 'DEBIT-CARD', 'BANK-ACCOUNT', 'USSD', 'WALLET-ID', '*'];
const FEE_TYPE = ['FLAT', 'PERC', 'FLAT_PERC'];

let _erroMsg = [];


const  _checkFeesId = (feesId, res) => {
    if (feesId.length === 8 && feesId.match(/^[0-9a-zA-Z]+$/)) {
        return feesId;
    }
    else {
        _erroMsg.push(`Invalid fees ${feesId}`);
    }
}


const _checkFeesCurrency = (feeCurrency, res) => {
    if (feeCurrency.length === 3 && (feeCurrency === "NGN" || feeCurrency === "*")) {
        return feeCurrency;
    }
    else {
        _erroMsg.push(`Invalid currency ${feeCurrency}`);
    }
}


const _checkFeeLocale = (feeLocale, res) => {
    if (FEE_LOCALE.includes(feeLocale)) {
        return feeLocale;
    }
    else {
        _erroMsg.push(`Invalid fee locale ${feeLocale}`);
    }
}

const _checkFeeEntity = (feeEntity, res) => {
    if (FEE_ENTITY.includes(feeEntity)) {
        return feeEntity;
    }
    else {
        _erroMsg.push(`Invalid fee entity ${feeEntity}`);
    }
}



const _otherChecks = (item, res) => {
    if (item === ":" || item == "APPLY") {
        return true;
    }
    else {
        _erroMsg.push(`Invalid item ${item}`);
    }
}


const _checkFeeType = (feeType, res) => {
    if (FEE_TYPE.includes(feeType)) {
        return feeType;
    }
    else {
        _erroMsg.push(`Invalid item ${feeType}`);
    }
}


const _checkFeeValue = (feeValue, res) => {
    if (feeValue >= 0) {
        return feeValue;
    }
    else {
        _erroMsg.push(`Invalid fee value ${feeValue}`);
    }
}


const compareCurrencyOrFeeEntityOrLocal = (arrValue, itemValue, anonymousValue) => {
    return result = (arrValue === itemValue || arrValue === anonymousValue) ? true : false;
}


const compareEntityProperty = (arrValue, arrPaymentEntity, anonymousValue) => {
    return result = (arrValue === arrPaymentEntity.Issuer || arrValue === arrPaymentEntity.Brand || arrValue === arrPaymentEntity.Number || arrValue === arrPaymentEntity.SixID || arrValue === anonymousValue) ? true : false;
}


const _sendError = () => {
    return _erroMsg;
}

const _clearError = () => {
    return _erroMsg.length = 0;
}


module.exports =
{
    _checkFeesId,
    _checkFeesCurrency,
    _checkFeeLocale,
    _checkFeeEntity,
    _otherChecks,
    _checkFeeType,
    _checkFeeValue,
    _sendError,
    _clearError,
    compareCurrencyOrFeeEntityOrLocal,
    compareEntityProperty
};