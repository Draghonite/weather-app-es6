const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3050;

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/src/index.html'));
// });

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});