'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').load();

module.exports = (publicRouter) => {
  publicRouter.route('/')
    .get((req, res) => {
      request({
        url: 'https://www.bungie.net/Platform/Destiny/Stats/Account/2/4611686018433293259/',
        headers: {
          'X-API-Key': process.env.API_KEY
        }
      }, function(err, response, body) {
        if(err){
          console.log(err);
        } else {
          res.status(response.statusCode).json(body);
          res.end()
        }
      })
    });
};
