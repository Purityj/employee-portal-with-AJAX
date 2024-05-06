// create Express server
const express = require('express');    //load express
const app = express();                //initialize express
const bodyParser = require('body-parser');  //load body parser 
const cors = require('cors');
const apiRouter = require('./api/apiRouter')     //import api router

const hostname = '127.0.0.1';
const port = 3000;

// create application/json parser
const jsonParser =  bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlEncodedParser = bodyParser.urlencoded({extended: false});
// configure bodyParser
app.use(jsonParser);
app.use(urlEncodedParser);

// configure cors
app.use(cors());

// configure apiRouter  so that any request starting with /api will be routed/forwarded to the apiRouter
app.use('/api', apiRouter);

// get 
app.get('/', (request, response) => {
    response.send(`<h2>Welcome to Express Server of Employees Portal</h2>`);
});

app.listen(port, hostname, () => {
    console.log(`Express Server is started at http://${hostname}:${port}`);
})

