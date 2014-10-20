'use strict';

angular.module('icedaxJwplayerApp')
  .controller('VideoeditCtrl', function ($scope, $log, $location, videoData) {

    $scope.isActive = function (viewLocation) {
      //$log.log('isActive', $location.path());
      return viewLocation === $location.path();
    };

    videoData.create();
  });
