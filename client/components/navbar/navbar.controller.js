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
        'title': 'Image Panel',
        'link': '/imagePanel'
      },
      {
        'title': 'Detail Panel',
        'link': '/detailPanel'
      },
      {
        'title': 'Embeded',
        'link': '/embededVideo'
      },
      {
        'title': 'InsideIFrame',
        'link': '/embededAsIFrame'
      },


    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });