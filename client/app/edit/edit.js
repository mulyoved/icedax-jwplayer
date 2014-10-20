'use strict';

angular.module('icedaxJwplayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit', {
        url: '/edit',
        abstract: true,
        templateUrl: 'app/edit/edit.html',
        controller: 'EditCtrl'
      });
  });