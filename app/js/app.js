'use strict'
const angular = require('angular');
require('angular-route');

angular.module('destinyApp', []).controller('AppController', ['$http', function($http) {
  let vm = this;
  vm.message = 'Please enter your PSN or Xbox username below.';
  vm.info;
  vm.consoleId = '2'; //default playstation, xbox is 1
  vm.playerName = '';
  vm.hide = false;


  vm.getInfo = function() {
    $http.get('/public/c/' + vm.consoleId + '/' + vm.playerName)
      .then((res) => {
        vm.info = res.data;
        document.getElementById('infoContainer').classList.remove('ng-hide');
        console.log('this is vm.info ', vm.info);
      }, (err) => {
        vm.message = "Status " + err.status + ", " + err.data + " Please enter your PSN or Xbox username below.";
        document.getElementById('infoContainer').classList.add('ng-hide');
        console.log('GET err: ', err)
      });
  };
}]);
