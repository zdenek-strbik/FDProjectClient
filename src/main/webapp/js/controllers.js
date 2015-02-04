'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
      controller('o2Controller', ['$scope', '$http', 'tableService', function ($scope, $http, tableService) {

         $scope.o2Setup = {
            rounds: 3,
            hold: 5,
            breathe: 2,
            change: 1
         };

         $scope.o2Table = [];

         var start = function (state) {
            console.log('START');
         };

         var finished = function (state) {
            clearInterval(state.tickId);
            console.log('FINISHED');
         };

         var switchAction = function (state) {
            state.currentKeyFrame++;
            state.breathe = !state.breathe;
            console.log('SWITCH: breathe = ' + state.breathe);
         };

         var tick = function (state) {
            state.keyFrame++;
            console.log(state.keyFrame);
         };

         $scope.startO2table = function () {
            startTable($scope.o2Table);
         };

         var timer = function (state) {
            if (state.keyFrame == 0) {
               start(state);
            }

            tick(state);

            if (state.keyFrame == state.total) {
               switchAction(state);
               finished(state);
               return;
            }

            if (state.keyFrame == state.keyFrames[state.currentKeyFrame]) {
               switchAction(state);
            }

         };

         var startTable = function (table) {
            var keyFrames = tableService.calculateKeyFrames(table);

            var state = {
               index: 0,
               current: table[0],
               keyFrames: keyFrames,
               keyFrame: 0,
               currentKeyFrame: 0,
               total: _.last(keyFrames),
               breathe: true
            };

            state.tickId = setInterval(function () {

               timer(state);

            }, 1000);
         };

         $scope.$watch('o2Setup', function (o2) {

            $scope.o2Table = tableService.reloadO2table(o2);

         }, true);

         $scope.o2Table = tableService.reloadO2table($scope.o2Setup);

      }]);