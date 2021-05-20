const { query } = require('express-validator');
const { useExpressValidators } = require('../errorHandler');
const ValidationMotives = require('./validationMotives');


const googleInterest = useExpressValidators([
    query('coin', ValidationMotives.DEFAULT)
        .exists().withMessage(ValidationMotives.REQUIRED).bail()
        .isString().withMessage(ValidationMotives.STRING).bail()
        .trim(),

    query('location', ValidationMotives.DEFAULT)
        .exists().withMessage(ValidationMotives.REQUIRED).bail()
        .isString().withMessage(ValidationMotives.STRING).bail()
        .trim()
        .isAlpha().withMessage(ValidationMotives.LETTERS).bail()
        .isLength({ max: 3 }).withMessage(ValidationMotives.TOO_LONG(3)).bail()
        .toUpperCase(),

    query('timePeriod', ValidationMotives.DEFAULT)
        .exists().withMessage(ValidationMotives.REQUIRED).bail()
        .isString().withMessage(ValidationMotives.STRING).bail()
        .trim()
        .toLowerCase()
        .custom((string) => (
            (string === 'last day') ||
            (string === 'last week') ||
            (string === 'last month') ||
            (string === 'last year') ||
            (string === 'last decade'))
        ),

    query('searchType', ValidationMotives.DEFAULT)
        .isString().withMessage(ValidationMotives.STRING).bail()
        .trim()
        .toLowerCase()
        .custom((string) => (
            (string === 'web search') ||
            (string === 'images') ||
            (string === 'news') ||
            (string === 'youtube') ||
            (string === 'froogle'))
        ),
]);

module.exports = {
    googleInterest,
};
