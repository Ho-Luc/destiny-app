'use strict';

const express = require('express');
const app = express();
let port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/build'));
app.listen(port, () => console.log('server started on 8080.'));
