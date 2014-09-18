'use strict';

angular.module('icedaxJwplayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('carousel', {
        url: '/carousel',
        templateUrl: 'app/carousel/carousel.html',
        controller: 'CarouselCtrl'
      });
  });