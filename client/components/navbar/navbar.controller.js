'use strict';

angular.module('icedaxJwplayerApp')
  .controller('NavbarCtrl', function ($scope, $location, $log, Auth, config_debug) {
    var devMode = config_debug;

    if (devMode) {
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
          'title': 'Videos',
          'link': '/edit/videoList',
          login: true
        }
      ];

      $scope.samplePagesMenu = [
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
          'title': 'Embeded DB',
          'link': '/embededVideoDB/5443c871f35b382c266fd1a7'
        },
        {
          'title': 'InsideIFrame',
          'link': '/embededAsIFrame'
        },
        {
          'title': 'Edit Video',
          'link': '/edit/videoEdit/videoEdit_Select'
        },
        {
          'title': 'Test Page',
          'link': '/edit/testPage'
        }
      ];
    }
    else {
      $scope.menu = [];
      $scope.samplePagesMenu = [];
    }

    $scope.filterMenu = function(item) {
      return (Auth.isLoggedIn() || !item.login);
    };

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });