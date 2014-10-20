'use strict';

angular.module('icedaxJwplayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('imagePanel', {
        url: '/imagePanel',
        templateUrl: 'app/imagePanel/imagePanel.html',
        controller: 'ImagepanelCtrl'
      });
  });