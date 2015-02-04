'use strict';

/* Services */


angular.module('myApp.services', []).service('tableService', function () {

   var INITIAL_BREATHE_TIME = 4;

   var $this = this;

   $this.reloadO2table = function (o2Setup) {
      var o2Table = [];
      var inc = 0;

      for (var i = 1; i <= o2Setup.rounds; i++) {
         o2Table.unshift(o2Setup.hold - inc);

         if (i != o2Setup.rounds) {
            o2Table.unshift(o2Setup.breathe);
         }

         inc += o2Setup.change;
      }

      o2Table.unshift(INITIAL_BREATHE_TIME);

      return o2Table;
   };

   $this.calculateKeyFrames = function (table) {
      var keyFrames = [];
      var previousKeyFrame = 0;
      _.each(table, function (keyFrame) {
         var currentKeyFrame = (previousKeyFrame + keyFrame);
         keyFrames.push(currentKeyFrame);
         previousKeyFrame = currentKeyFrame;
      });

      return keyFrames;
   };

});
