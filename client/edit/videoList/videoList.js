'use strict';

angular.module('icedaxJwplayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit.videoList', {
        url: '/videoList',
        templateUrl: 'edit/videoList/videoList.html',
        controller: 'VideolistCtrl'
      });
  });