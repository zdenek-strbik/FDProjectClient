'use strict';

/* Services */


angular.module('myApp.services', []).service('tableService', function () {

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

      o2Table.unshift(o2Setup.init);

      return o2Table;
   };

   function getSounds(keyFrame, breathe) {
      // if (keyFrame == 0) {
      //    return 'start';
      // }
      return breathe ? ['breathe'] : ['hold'];
   }

   $this.calculateKeyFrames = function (table) {
      var keyFrames = [];
      var previousKeyFrame = 0;
      var breathe = false;

      _.each(table, function (frame) {
         var currentKeyFrame = (previousKeyFrame + frame);

         var keyFrame = {
            value: currentKeyFrame,
            sounds: getSounds(currentKeyFrame, breathe)
         };

         breathe = !breathe;

         keyFrames.push(keyFrame);
         previousKeyFrame = currentKeyFrame;
      });

      return keyFrames;
   };

});
