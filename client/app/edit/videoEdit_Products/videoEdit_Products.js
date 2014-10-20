'use strict';

angular.module('icedaxJwplayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit.videoEdit.videoEdit_Products', {
        url: '/videoEdit_Products',
        templateUrl: 'app/edit/videoEdit_Products/videoEdit_Products.html',
        controller: 'VideoeditProductsCtrl',
        onExit: function(videoData) {
          console.log('onExit', videoData.items);
        },

        onExitResolve: function(videoData, $timeout, $q, $log) {
          return videoData.save();
        }
      });
  });