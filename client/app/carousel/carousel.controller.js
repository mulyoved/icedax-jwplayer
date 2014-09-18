'use strict';

angular.module('icedaxJwplayerApp')
  .controller('CarouselCtrl', function ($scope, $log) {
    $scope.imagesIdx = [1,2,3,4,5,6,7,8];

    $scope.imageClick = function(idx) {
      $log.log('imageClick', idx)
    }
  });
