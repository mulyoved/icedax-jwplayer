'use strict';

angular.module('icedaxJwplayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lendingPage', {
        url: '/',
        templateUrl: 'app/lendingPage/lendingPage.html',
        controller: 'LendingpageCtrl'
      });
  });