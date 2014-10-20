'use strict';

angular.module('icedaxJwplayerApp')
  .controller('VideoeditPublishCtrl', function ($scope, $log, videoData, config_debug) {
    $log.log('VideoeditPublishCtrl', videoData.data, videoData.id);

    $scope.iframeVideoUrl = 'embededVideoDB/'+videoData.id;

    if (config_debug) {
      $scope.shareUrl = 'http://414fde5a.ngrok.com/embededVideoDB/' + videoData.id;
    }
    else {
      $scope.shareUrl = 'http://thawing-depths-2331.herokuapp.com/embededVideoDB/' + videoData.id;
    }

    $scope.shareText = videoData.data.title;
    $scope.shareImage = videoData.data.image;


    $log.log('share URL', $scope.shareUrl);
    $log.log('share Text', $scope.shareText);
    $log.log('share image', $scope.shareImage);
  });
