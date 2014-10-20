'use strict';

angular.module('icedaxJwplayerApp')
  .controller('ImagepanelCtrl', function ($scope, $log) {
    $scope.showCarousel = true;
    $scope.selectedImage = 1;

    $scope.isSelected = function(idx) {
      return idx == $scope.selectedImage ? 'xselected-img' : null;
    };

    $scope.imagesIdx = [1,2,3,4,5,6,7,8,9,10,11];

    $scope.imageClick = function(idx, $event) {
      $log.log('imageClick', idx);
      $event.stopPropagation();
      $scope.selectedImage = idx;
    };

  });
