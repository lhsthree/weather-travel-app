 //empty JS object
let projectData = {};

const express = require('express');
//start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* middleware */
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//initialize project folder
app.use(express.static('website'));


//get route
app.get('/all', getInfo);
function getInfo (req, res) {
    res.send(projectData);
};
//post route
app.post('/add', sendInfo)
function sendInfo (req, res) {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.content = req.body.content;
    res.send(projectData)
}

//set up server
const port = 5500

const server = app.listen(port, () => {console.log(`running on localhost: ${port}`)});