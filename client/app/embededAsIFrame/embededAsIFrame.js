'use strict';

angular.module('icedaxJwplayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('embededAsIFrame', {
        url: '/embededAsIFrame',
        templateUrl: 'app/embededAsIFrame/embededAsIFrame.html',
        controller: 'EmbededasiframeCtrl'
      });
  });