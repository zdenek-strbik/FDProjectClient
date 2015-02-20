'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
      controller('o2Controller', ['$scope', '$http', 'tableService', function ($scope, $http, tableService) {

         $scope.o2Setup = {
            init: 3,
            rounds: 3,
            hold: 5,
            breathe: 2,
            change: 1
         };

         $scope.state = {};

         function playSounds(state) {
            var frame = state.frames[state.frame];
            var wait = 0;

            _.each(frame.sounds, function (sound) {
               setTimeout(function () {
                  console.log(sound + ', wait=' + wait);
                  document.getElementById(sound).play();
                  wait += 3000;
               }, wait);
            });
         }

         var stop = function (state) {
            clearInterval(state.tickId);
            state.tickId = null;
            state.frame = 0;
         };

         var tick = function (state) {

            state.frame++;

            console.log(state.frame);
            playSounds(state);

            if (state.frames[state.frame] == _.last(state.frames)) {
               stop(state);
            }
         };

         $scope.startTable = function (table) {
            if ($scope.state.tickId) {
               stop($scope.state);
               return;
            }

            var frames = tableService.calculateFrames(table);

            $scope.state.index = 0;
            $scope.state.frames = frames;
            $scope.state.frame = 0;
            $scope.state.total = _.last(frames).value;
            $scope.state.tickId = setInterval(function () {

               tick($scope.state);
               $scope.$digest();

            }, 1000);
         };

         $scope.$watch('o2Setup', function (o2) {

            $scope.o2Table = tableService.reloadO2table(o2);

         }, true);

         $scope.o2Table = tableService.reloadO2table($scope.o2Setup);

      }]);