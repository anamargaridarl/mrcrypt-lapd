const { Router } = require('express');
const converser = require('./routes/converser');
const homepage = require('./routes/homepage');


module.exports = () => {
    const app = Router();
    converser(app);
    homepage(app);
    
    return app;
};
