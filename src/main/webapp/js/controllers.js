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

         $scope.o2Table = [];
         $scope.o2Frames = [];

         function playSound(state) {
            var keyFrame = state.keyFrames[state.currentKeyFrame];

            if (state.frame == keyFrame.value) {
               _.each(keyFrame.sounds, function (sound) {
                  var element = document.getElementById(sound);
                  element.play();
               });
            }
         }

         var start = function (state) {
            $scope.o2Frames.push('START');
         };

         var finished = function (state) {
            switchAction(state);
            clearInterval(state.tickId);
            $scope.o2Frames.push('FINISHED');
         };

         var switchAction = function (state) {
            state.currentKeyFrame++;
            $scope.o2Frames.push('SWITCH');
         };

         var tick = function (state) {
            state.frame++;
            $scope.o2Frames.push(state.frame);

            playSound(state);
         };

         $scope.startO2table = function () {
            startTable($scope.o2Table);
         };

         var timer = function (state) {
            if (state.frame == 0) {
               start(state);
            }

            tick(state);

            if (state.frame == state.total) {
               finished(state);
               return;
            }

            if (state.frame == state.keyFrames[state.currentKeyFrame].value) {
               switchAction(state);
            }

         };

         var startTable = function (table) {
            var keyFrames = tableService.calculateKeyFrames(table);

            var state = {
               index: 0,
               current: table[0],
               keyFrames: keyFrames,
               frame: 0,
               currentKeyFrame: 0,
               total: _.last(keyFrames).value,
               breathe: true
            };

            state.tickId = setInterval(function () {

               timer(state);
               $scope.$digest();

            }, 1000);
         };

         $scope.$watch('o2Setup', function (o2) {

            $scope.o2Table = tableService.reloadO2table(o2);

         }, true);

         $scope.o2Table = tableService.reloadO2table($scope.o2Setup);

      }]);