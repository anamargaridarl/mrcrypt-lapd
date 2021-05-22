const { query } = require('express-validator');
const { useExpressValidators } = require('../errorHandler');
const ValidationMotives = require('./validationMotives');


const news = useExpressValidators([
    query('categories', ValidationMotives.DEFAULT)
        .optional({ nullable: true, checkFalsy: true })
        .isString().withMessage(ValidationMotives.STRING).bail()
        .trim()
        .toUpperCase(),
    query('page', ValidationMotives.DEFAULT)
        .exists().withMessage(ValidationMotives.REQUIRED).bail()
        .isNumeric().withMessage(ValidationMotives.NUMBER).bail(),
]);

module.exports = {
    news,
};
