'use strict';

angular.module('icedaxJwplayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('embededVideoDB', {
        url: '/embededVideoDB/:videoId',
        templateUrl: 'app/embededVideoDB/embededVideoDB.html',
        controller: 'EmbededvideodbCtrl'
      });
  });