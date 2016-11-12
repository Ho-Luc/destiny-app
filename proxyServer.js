'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').load();

let publicRouter = express.Router();

//stats proxy-server route
require('./routes/stats-route.js')(publicRouter);

app.use(bodyParser.json());
app.use('/public', publicRouter)
app.use('/', express.static(__dirname + '/build'));

app.listen(process.env.PORT || 3000, console.log('server started on port 3000'));
