'use strict';

angular.module('icedaxJwplayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit', {
        url: '/edit',
        abstract: true,
        templateUrl: 'edit/edit/edit.html',
        controller: 'EditCtrl'
      });
  });