'use strict'
const angular = require('angular');
require('dotenv').config({path: __dirname + '/../../.env'});
require('angular-route');

function ApiService($http) {
  this.$http = $http;
  this.url = "/space/";
};

angular.module('destinyApp', []).service('apiService', ApiService).controller('AppController', ['$http', '$interval', function($http, $interval) {
  let vm = this;
  vm.message = 'Please enter your PSN or Xbox username below.';
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
    $http.get('/public/')
      .then((res) => {
        vm.message = res;
      }, err => console.log('GET err: ', err));
  };
}]);

ApiService.prototype.getMembershipId = function() {
  //return promice for controller to use
  return this.$http.get(this.url)
};































//
