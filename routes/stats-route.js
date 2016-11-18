'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
let characters = require(__dirname + '/../lib/characters.js');
let user = require(__dirname + '/../lib/user.js');
require('dotenv').load();

module.exports = (publicRouter) => {
  publicRouter.route('/c/:consoleId/:playerName')
  .get((req, res) => {
    let membershipId = '';

    request({ //gets membershipId
      url: 'https://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/' + req.params.consoleId + '/' + req.params.playerName,
      headers: {
        'X-API-Key': process.env.API_KEY
      }
    }, function(err, response, body) {
      if(err){
        console.log('Server member GET error request: ' + err);
      } else {
        let testJson = JSON.parse(body);
        membershipId = testJson.Response[0].membershipId || null; //sets id

        request({ //gets stats
          url: 'https://www.bungie.net/Platform/Destiny/Stats/Account/' + req.params.consoleId + '/' + membershipId,
          headers: {
            'X-API-Key': process.env.API_KEY
          }
        }, function(err, response, body) {
          if(err){
            console.log('Server stats GET error request: ' + err);
          } else {
            var stats = characters.individualStats(JSON.parse(body));

            request({ //gets bungie.net user info
              url: 'https://www.bungie.net/Platform/User/GetBungieAccount/'+ membershipId + '/' + req.params.consoleId,
              headers: {
                'X-API-Key': process.env.API_KEY
              }
            }, function(err, response, body) {
              if(err) {
                console.log('Server user GET error request: ', err);
              } else {
                var bundle = user.emblem(JSON.parse(body), stats);

                res.status(200).json(bundle); //module that parses json to get relevent info
                res.end();
              }
            })

          }
        })

      }
    }) //outer request
  }) //outer get
};
