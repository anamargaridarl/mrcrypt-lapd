const { param } = require('express-validator');
const { useExpressValidators } = require('../errorHandler');
const ValidationMotives = require('./validationMotives');


const coin = useExpressValidators([
    param('symbol', ValidationMotives.DEFAULT)
        .exists().withMessage(ValidationMotives.REQUIRED).bail()
        .isString().withMessage(ValidationMotives.STRING).bail()
        .trim(),

    param('name', ValidationMotives.DEFAULT)
        .exists().withMessage(ValidationMotives.REQUIRED).bail()
        .isString().withMessage(ValidationMotives.STRING).bail()
        .trim()
]);


module.exports = {
    coin
};
