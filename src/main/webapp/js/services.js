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

   var calculateKeyFrames = function (table) {
      var keyFrames = [];
      var previousKeyFrame = 0;

      _.each(table, function (frame) {
         var currentKeyFrame = (previousKeyFrame + frame);

         keyFrames.push(currentKeyFrame);
         previousKeyFrame = currentKeyFrame;
      });

      return keyFrames;
   };

   $this.calculateFrames = function (table) {
      var keyFrames = calculateKeyFrames(table);
      var frames = [];
      var breathe = false;
      var currentFrame = 0;
      var previousKeyFrame = 0;

      frames.push({
         value: currentFrame++
      });

      frames.push({
         value: currentFrame,
         sounds: ['start']
      });

      _.each(keyFrames, function (keyFrame) {
         for (var i = 1; i < keyFrame - previousKeyFrame; i++) {
            currentFrame += 1;
            frames.push({
               value: currentFrame
            });
         }

         frames.push({
            value: keyFrame,
            sounds: breathe ? ['breathe'] : ['hold']
         });

         currentFrame += 1;
         breathe = !breathe;
         previousKeyFrame = keyFrame;
      });

      _.last(frames).sounds.push('finished');

      return frames;
   };

});
