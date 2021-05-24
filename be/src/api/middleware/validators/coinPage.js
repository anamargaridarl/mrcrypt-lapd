const { param } = require('express-validator');
const { useExpressValidators } = require('../errorHandler');
const ValidationMotives = require('./validationMotives');


const coinSymbol = useExpressValidators([
    param('coinSymbol', ValidationMotives.DEFAULT)
        .exists().withMessage(ValidationMotives.REQUIRED).bail()
        .isString().withMessage(ValidationMotives.STRING).bail()
        .trim()
]);

const coinName = useExpressValidators([
    param('coinName', ValidationMotives.DEFAULT)
        .exists().withMessage(ValidationMotives.REQUIRED).bail()
        .isString().withMessage(ValidationMotives.STRING).bail()
        .trim()
]);

const severalSymbols = useExpressValidators([
    param('coinNames', ValidationMotives.DEFAULT)
        .exists().withMessage(ValidationMotives.REQUIRED).bail()
        .matches(/^(\w*,)*(\w+)$/gmi).withMessage('Invalid list of coins').bail()
        .trim()
]);


module.exports = {
    coinSymbol,
    coinName,
    severalSymbols
};
