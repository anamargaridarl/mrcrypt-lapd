const HTTPStatus = require('http-status-codes');
const { validationResult } = require('express-validator');
const createError = require('http-errors');


const useExpressValidators = (validators) => async (req, res, next) => {
    await Promise.all(validators.map((validator) => validator.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    return next(createError(HTTPStatus.StatusCodes.BAD_REQUEST));
};

module.exports = {
    useExpressValidators,
};
