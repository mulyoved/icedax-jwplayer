'use strict';

angular.module('icedaxJwplayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('jwplayer-simple', {
        url: '/jwplayer-simple',
        templateUrl: 'app/jwplayer-simple/jwplayer-simple.html',
        controller: 'JwplayerSimpleCtrl'
      });
  });