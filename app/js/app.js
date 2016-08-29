'use strict'
const angular = require('angular');
require('dotenv').config({path: __dirname + '/../../.env'});
require('angular-route');

angular.module('destinyApp', ['ngRoute'])
  .controller('AppController', ['$http', '$interval', function($http, $interval) {
    let vm = this;
    vm.message = 'Please enter your PSN or Xbox username below.';
    vm.config = {
      headers: {
        'X-API-Key': process.env.API_KEY
      }
    };
    vm.membershipType = 2; //default playstation, xbox is 1
    vm.displayName = null;
    vm.membershipId = null;
    vm.characterId = null;

    vm.getMembershipId = function(name) {
      $http.get('http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/1/' + vm.displayName + '/', vm.config)
        .then((res) => {
          vm.membershipId = res.Response[0].membershipId;
        }, err => console.log('GET err:, err'));
    };

    vm.getInfo = function() {
      console.log('get request');
      // $http.get/'https://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/' + vm.membershipId + '/' + , vm.config)
      $http.get('http://www.bungie.net/Platform/Destiny/2/Account/4611686018433293259/' , vm.config)
        .then((res) => {
          vm.message = res;
        }, err => console.log('GET err: ', err));
    };
  }]);
