'use strict'
const angular = require('angular');
require('dotenv').config({path: __dirname + '/../../.env'});
require('angular-route');

angular.module('destinyApp', ['ngRoute'])
  .controller('AppController', ['$http', '$interval', function($http, $interval) {
    let vm = this;
    vm.message = 'hello world';
    // vm.getInfo = function() {
    //   $http.get()
    // };
  }]);
