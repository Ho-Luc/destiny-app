'use strict'
const angular = require('angular');
require('angular-route');

angular.module('destinyApp', []).controller('AppController', ['$http', function($http) {
  let vm = this;
  vm.message = 'Please enter your PSN or Xbox username below.';
  vm.consoleId = '2'; //default playstation, xbox is 1
  vm.playerName = '';
  vm.membershipId = null;
  vm.characterId = null;

  /*vm.getMembershipId = function(name) {
    $http.get('http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/1/' + vm.displayName + '/', vm.config)
      .then((res) => {
        vm.membershipId = res.Response[0].membershipId;
      }, err => console.log('GET err:, err'));
  };*/

  vm.getInfo = function() {
    $http.get('/public/c/' + vm.consoleId + '/' + vm.playerName)
      .then((res) => {
        console.log(typeof res)
        vm.message = res;
      }, err => console.log('GET err: ', err));
  };
}]);
