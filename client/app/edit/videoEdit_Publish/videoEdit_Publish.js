'use strict';

angular.module('icedaxJwplayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit.videoEdit.videoEdit_Publish', {
        url: '/videoEdit_Publish',
        templateUrl: 'app/edit/videoEdit_Publish/videoEdit_Publish.html',
        controller: 'VideoeditPublishCtrl'
      });
  });