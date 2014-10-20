'use strict';

angular.module('icedaxJwplayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('embededVideo', {
        url: '/embededVideo',
        templateUrl: 'app/embededVideo/embededVideo.html',
        controller: 'JwplayerSimpleCtrl' //'EmbededvideoCtrl'
      });
  });