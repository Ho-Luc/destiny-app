'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
let characters = require(__dirname + '/../lib/characters.js');
require('dotenv').load();

module.exports = (publicRouter) => {
  publicRouter.route('/:consoleId/:playerName')
  .get((req, res) => {
    let membershipId = '';

    request({ //gets membershipId
      url: 'https://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/' + req.params.consoleId + '/' + req.params.playerName,
      headers: {
        'X-API-Key': process.env.API_KEY
      }
    }, function(err, response, body) {
      if(err){
        console.log('First error request: ' + err);
      } else {
        let testJson = JSON.parse(body);
        membershipId = testJson.Response[0].membershipId; //sets id

        request({ //gets stats
          url: 'https://www.bungie.net/Platform/Destiny/Stats/Account/' + req.params.consoleId + '/' + membershipId,
          headers: {
            'X-API-Key': process.env.API_KEY
          }
        }, function(err2, response2, body2) {
          if(err2){
            console.log('Second error request: ' + err2);
          } else {
            var bundle = characters.individualStats(JSON.parse(body2))
            //console.log('this is the bundle', bundle);
            res.status(200).json(bundle); //module that parses json to get relevent info
            res.end();
          }
        })

      };
    })

  })
};
