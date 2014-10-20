'use strict';

angular.module('icedaxJwplayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('detailPanel', {
        url: '/detailPanel',
        templateUrl: 'app/detailPanel/detailPanel.html',
        controller: 'DetailpanelCtrl'
      });
  });