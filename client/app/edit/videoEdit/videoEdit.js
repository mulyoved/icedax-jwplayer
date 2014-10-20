'use strict';

angular.module('icedaxJwplayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit.videoEdit', {
        url: '/videoEdit',
        abstract: true,
        templateUrl: 'app/edit/videoEdit/videoEdit.html',
        controller: 'VideoeditCtrl'
      });
  });