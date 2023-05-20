// require express, http, cors and body-parser
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Set up instance of app
const app = express();

// Use body-parser as middle-ware and cors for Cross-Origin Resource Sharing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// projectData object to store and return data
let projectData = {};

// GET call to fetch stored projectData
app.get('/projectData', (req, res) => {
    res.status(200).send(projectData);
});

// POST call to add latest request data to project data
app.post('/projectData', (req, res) => {
    projectData = {
        temp: req.body.temp, date: req.body.date, content: req.body.content
    };
    res.status(200).send(projectData);
})


const hostname = 'localhost';
const port = 3000;
const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${ hostname }:${ port }/`);
});