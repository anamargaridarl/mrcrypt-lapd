const moment = require('moment');

const dateConvert = (timePeriod) => {
    switch (timePeriod) {
        case 'last week':
            return moment().subtract(1, 'w').toDate();
        case 'last month':
            return moment().subtract(1, 'M').toDate();
        case 'last year':
            return moment().subtract(1, 'y').toDate();
        case 'last decade':
            return moment().subtract(10, 'y').toDate();
        default:
            return Date.now();
    }
};

module.exports = dateConvert;
