const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3050;

app.use(express.static('dist'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});