'use strict';

angular.module('icedaxJwplayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit.testPage', {
        url: '/testPage',
        templateUrl: 'app/edit/testPage/testPage.html',
        controller: 'TestpageCtrl'
      });
  });