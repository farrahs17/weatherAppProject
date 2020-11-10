// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, () => {console.log(`running on localhost: ${port}`)});
// Callback to debug
const checkServer = () =>  {
    console.log(`running on localhost: {$port}`);
}
// Initialize all route with a callback function

// Callback function to complete GET '/all'
const sendData = (req, res) => {
    res.send(projectData);
};
app.get('/all', sendData);

// Post Route
const postData = (req, res) => {
    data = {
        temp: req.body.temp,
        date: req.body.date,
        feeling: req.body.feeling,
    }

    projectData = data;
    res.send(projectData);
}
app.post('/data', postData);