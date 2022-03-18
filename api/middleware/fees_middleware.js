const helpers = require("../../helpers/response");

const {
    _checkFeesId,
    _checkFeesCurrency,
    _checkFeeLocale,
    _checkFeeEntity,
    _otherChecks,
    _checkFeeType,
    _checkFeeValue,
    _sendError
} = require("../../helpers/validator");


const _feesMiddleWearAction = async (feesSpecs, res) => {
    let feeSpecData = [];
    let feesResult = [];

    let tree = new BST();

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
                "Specificity": feeSpecData[i].split('*').length - 1
            });

            //var data = {
            //    "FeeId": feeId,
            //    "FeeCurrency": curreny,
            //    "FeeLocale": feeLocale,
            //    "FeeEntity": feeEntity,
            //    "EntityProperty": entityProperty,
            //    "FeeType": feeType,
            //    "FeeValue": feeValue,
            //    "PercValue": percValue === undefined ? null : percValue,
            //    "Specificity": feeSpecData[i].split('*').length - 1
            //};
            //tree.insert(data);
        }
        //return await tree;
        return await feesResult;
    }
    else {
        helpers._showError(res, 500, "Fees configuration spec is null");
    }
}

function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = show;
}


function BST() {
    this.root = null;
    this.insert = insert;
    this.find = find;
}


function show() {
    return this.data;
}


function insert(data) {
    var n = new Node(data, null, null);
    if (this.root == null) {
        this.root = n;
    } else {
        var current = this.root;
        var parent;
        while (true) {
            parent = current;
            if (data["Specificity"] < current.data["Specificity"]) {
                current = current.left;
                if (current == null) {
                    parent.left = n;
                    break;
                }
            } else {
                current = current.right;
                if (current == null) {
                    parent.right = n;
                    break;
                }
            }
        }
    }
}



function find(data) {
    var current = this.root;
    while (current.data != data) {
        if (data < current.data) {
            current = current.left;
        } else {
            current = current.right;
        }
        if (current == null) {
            return null;
        }
    }
    return current;
}



module.exports = { _feesMiddleWearAction };
