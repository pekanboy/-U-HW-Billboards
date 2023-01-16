const express = require('express');

const app = express();
const port = process.env.PORT || 5555;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'GET,HEAD,PUT,PATCH,POST,DELETE');
    next();
});

app.use(express.json());
app.use(function(req, res, next) {
    console.log(`[${req.method}]__[${req.path}] -- ${JSON.stringify(req.body)}`);
    next();
});
app.use('', require('./routes/routes.js'));

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}...`);
});
