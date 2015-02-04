'use strict';

/* Directives */


angular.module('myApp.directives', [])

      .directive('tableInput', function () {
         return {
            template: "<div>\n        <label>{{label}}: {{model}}</label>\n        <button ng-click=\"plus()\">+</button>\n        <button ng-click=\"minus()\">-</button>\n    </div>",
            restrict: 'E',
            scope: {
               model: '=',
               label: '@'
            },
            controller: function ($scope) {


               $scope.plus = function () {
                  $scope.model++;
               };

               $scope.minus = function () {
                  $scope.model--;
               };


            }
         }

      });