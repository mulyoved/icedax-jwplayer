'use strict';

angular.module('icedaxJwplayerApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title': 'Home',
        'link': '/'
      },
      {
        'title': 'Simple',
        'link': '/jwplayer-simple'
      },
      {
        'title': 'Sleek Carousel',
        'link': '/carousel'
      },
      {
        'title': 'OWL Carousel',
        'link': '/owlCarousel'
      },
      {
        'title': 'Embeded',
        'link': '/embededVideo'
      }


    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });