const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/test', (req, res) => {
  res.send({arg: 'Backend is running'});
});
