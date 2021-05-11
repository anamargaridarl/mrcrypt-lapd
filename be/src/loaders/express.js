const cors = require('cors');
const HTTPStatus = require('http-status-codes');
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const apiRoutes = require('../api');

module.exports = (app) => {
    app.use(express.json());
    app.use(logger('common'));
    app.use(cors());
    app.use(cookieParser());

    // Health check endpoint
    app.get('/', (_, res) => res.status(HTTPStatus.StatusCodes.OK).json({ 'online': true }));

    app.use('/api', apiRoutes());

    app.use((_, __, next) => {
        next(createError(404));
    });

    // error handler
    app.use((err, req, res) => {
    // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
};
