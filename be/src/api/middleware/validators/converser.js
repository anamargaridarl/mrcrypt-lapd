const { body } = require('express-validator');
const { useExpressValidators } = require('../errorHandler');
const ValidationMotives = require('./validationMotives');


const convert = useExpressValidators([
    body('from', ValidationMotives.DEFAULT)
        .exists().withMessage(ValidationMotives.REQUIRED).bail()
        .isString().withMessage(ValidationMotives.STRING).bail()
        .trim()
        .toUpperCase(),

    body('to', ValidationMotives.DEFAULT)
        .exists().withMessage(ValidationMotives.REQUIRED).bail()
        .isString().withMessage(ValidationMotives.STRING).bail()
        .trim()
        .toUpperCase(),

    body('value', ValidationMotives.DEFAULT)
        .exists().withMessage(ValidationMotives.REQUIRED).bail()
        .custom((num) => !isNaN(num)).withMessage(ValidationMotives.NUMBER),
]);

module.exports = {
    convert,
};
