'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
      controller('MyCtrl1', ['$scope', '$http', function ($scope, $http) {

         $scope.url = 'http://localhost:8070/rest/training/load';

         $scope.loadId = function loadId() {
            $http({method: 'GET', url: $scope.url}).
                  success(function (data, status, headers, config) {
                     $scope.randomId = data;
                  }).
                  error(function (data, status, headers, config) {
                     $scope.randomId = 'ERROR! ' + status;
                  });
         }

         $scope.loadId();
      }])
      .controller('MyCtrl2', [function () {

      }]);