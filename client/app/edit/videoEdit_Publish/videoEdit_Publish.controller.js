'use strict';

angular.module('icedaxJwplayerApp')
  .controller('VideoeditPublishCtrl', function ($scope, $log, videoData, config_debug, messageCenterService) {
    $log.log('VideoeditPublishCtrl', videoData.data, videoData.id);

    $scope.config_debug = config_debug;
    $scope.saveMessage = 'Saving Video...';

    $log.log('Saving data to server', videoData.data._v);
    videoData.save().then(function(answer) {
      $scope.iframeVideoUrl = 'embededVideoDB/'+videoData.id;

      if (config_debug) {
        $scope.shareUrl = 'http://414fde5a.ngrok.com/embededVideoDB/' + videoData.id;
      }
      else {
        $scope.shareUrl = 'http://thawing-depths-2331.herokuapp.com/embededVideoDB/' + videoData.id;
      }

      $scope.shareUrlValue = $scope.shareUrl;
      $scope.shareText = videoData.data.title;
      $scope.shareImage = videoData.data.image;

      $log.log('share URL', $scope.shareUrl);
      $log.log('share Text', $scope.shareText);
      $log.log('share image', $scope.shareImage);

      //$scope.duringSave = false;
      $scope.saveMessage = 'Loading Video...';
      $log.log('Video saved, waiting to loading', $scope.iframeVideoUrl);

    }, function(err) {
      $log.error('Failed to save data to server', err)
    });

    $scope.iframeLoaded = function() {
      //$log.log('iframeLoaded', $scope.iframeVideoUrl);
      $scope.$apply(function() {
        $scope.saveMessage = false;
      });

      $scope.copyToClipboard = function() {
        //messageCenterService.add('success', 'URL copied to clipboard', { status: messageCenterService.status.next });
      };
    };

  });
