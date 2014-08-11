'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
        controller('MyCtrl1', ['$scope', '$http', function($scope, $http) {
                $scope.loadId = function loadId() {
                    $http({method: 'GET', url: 'http://192.168.1.106/rest/training/load'}).
                            success(function(data, status, headers, config) {
                                $scope.randomId = data;
                            }).
                            error(function(data, status, headers, config) {
                                $scope.randomId = 'ERROR!';
                            });
                }

                $scope.loadId();
            }])
        .controller('MyCtrl2', [function() {

            }]);