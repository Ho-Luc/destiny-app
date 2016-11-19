'use strict'
const angular = require('angular');
require('angular-route');

angular.module('destinyApp', []).controller('AppController', ['$http', function($http) {
  let vm = this;
  vm.message = 'Please enter your PSN or Xbox username below.';
  vm.info;
  vm.consoleId = '2'; //default playstation, xbox is 1
  vm.playerName = '';
  vm.testName = 'bruh brobro';

  /*vm.getMembershipId = function(name) {
    $http.get('http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/1/' + vm.displayName + '/', vm.config)
      .then((res) => {
        vm.membershipId = res.Response[0].membershipId;
      }, err => console.log('GET err:, err'));
  };*/

  vm.getInfo = function() {
    $http.get('/public/c/' + vm.consoleId + '/' + vm.playerName)
      .then((res) => {
        vm.info = res.data;
        console.log('this is vm.info ', vm.info);
      }, err => console.log('GET err: ', err));
  };
}]);
