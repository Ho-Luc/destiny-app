'use strict'
// const angular = require('angular');
let Chart = require('chart.js');
// require('angular-route');

angular.module('destinyApp', []).controller('AppController', ['$http', function($http) {
  let vm = this;
  vm.message = 'Please enter your PSN or Xbox username below.';
  vm.info;
  vm.consoleId = ''; //playstation is 2, xbox is 1
  vm.playerName = '';
  vm.hide = false;

  vm.hideChart = function() {
    document.getElementById('chart-container').classList.add('ng-hide');
  };

  vm.getInfo = function() {
    $http.get('/public/c/' + vm.consoleId + '/' + vm.playerName)
      .then((res) => {
        vm.info = res.data;
        document.getElementById('info-container').classList.remove('ng-hide');
        vm.message = " Please enter your PSN or Xbox username below.";
        // console.log('this is vm.info ', vm.info);
      }, (err) => {
        vm.message = "Status " + err.status + ", " + err.data + " Please enter your PSN or Xbox username below.";
        document.getElementById('info-container').classList.add('ng-hide');
        //console.log('GET err: ', err)
      });
  };

  vm.makeChart = function(crucible, total){
    console.log('this is crucible time : ', crucible + ' and total time : ' + total);
    document.getElementById('chart-container').classList.remove('ng-hide');
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["PVP (in hrs)", "PVE (in hrs)"],
        datasets: [{
          label: '# of Hours',
          data: [(crucible/3600), ((total-crucible)/3600)],
          backgroundColor: [
            "#C0392B",
            "#34495E"
          ],
          hoverBackgroundColor: [
            "#CD6155",
            "#5D6D7E"
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  };

}]);
