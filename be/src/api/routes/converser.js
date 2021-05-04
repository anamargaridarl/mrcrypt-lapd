const HTTPStatus = require('http-status-codes');
const { Router } = require('express');
const router = Router();

module.exports = (app) => {
    app.use('/converser', router);

    /**
    * Retrieves cryptocurrencies
    */
    router.get('/coins', (_, res, next) => {
        try {
            // calls to CMC API
            console.info('quiero monedas!');
            return res.status(HTTPStatus.StatusCodes.OK).send();
        } catch (err) {
            return next(err);
        }
    });

    /**
    * Convert currencies
    */
    router.get('/convert', (req, res, next) => {
        try {
            const { from, to, value } = req.body;
            console.info(from, to, value);
            return res.status(HTTPStatus.StatusCodes.OK).send();
        } catch (err) {
            return next(err);
        }
    });
};
