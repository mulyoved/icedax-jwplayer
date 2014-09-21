'use strict';

angular.module('icedaxJwplayerApp')
  .controller('JwplayerSimpleCtrl', function ($scope, $log) {
    var videoId = 'playerADWzMGbKsCCQ';
    var player;
    $scope.showCarousel = false;
    $scope.selectedImage = 1;

    $scope.isSelected = function(idx) {

      var ret = (idx === $scope.selectedImage ? 'selected-img' : null);
      $log.log('isSelected',idx, ret);

      return ret;
    };

    $scope.imagesIdx = [1,2,3,4,5,6,7,8,9,10,11];

    angular.element(document).ready(function () {
      console.log('Document Ready');


      jwplayer(videoId).setup({
        file: '//www.youtube.com/watch?v=GeLw1iFoXho',
        title: 'Miss Kittin & The Hacker - Frank Sinatra (Full Version no bullshit)',
        width: '100%',
        aspectratio: '16:9'
      }).addButton(
        'http://placehold.it/64x64/ffffff/000000/&text=image1',
        'Show Products',
        function() {
          console.log('Show Products', jwplayer());
          showPC();
        },

        'show-product' //And finally, here we set the unique ID of the button itself.
      );

      player = jwplayer(videoId);
      player.onReady(function() {
        var video = angular.element('#' + videoId);
        var pc = angular.element('#pc');
        var videoGlass = angular.element('#video-glass');

        //pc.appendTo('#' + videoId);
        videoGlass.appendTo('#' + videoId);


        //var dock = angular.element('#' + videoId + '_controlbar');
        var dock = angular.element('#video-glass');
        console.log('ready', player.getWidth(), player.getHeight(), pc);

        showPC(true);
      });

      player = jwplayer(videoId);
      player.onSeek(function player_onSeek(e) {
        $log.log('onSeek', e);
      });

      player.onControls(function onControls(controls) {
        $log.log('onControls', controls);
      });

      player.onDisplayClick(function onDisplayClick() {
        $log.log('onDisplayClick');
        showPC();
      });

      player.onPlay(function onPlay() {
        $log.log('onPlay');
      });

      player.onPause(function onPause() {
        $log.log('onPause');
        showPC(true);
      });

      player.onIdle(function onIdle() {
        $log.log('onIdle');
      });

      player.onComplete(function onComplete() {
        $log.log('onComplete');
        showPC(true);
      });

      player.onTime(function onTime(e) {
        //$log.log('onTime', e.duration, e.position);
        var selectedIdx = Math.floor(e.position/30);
        if (selectedIdx != $scope.selectedImage && $scope.imagesIdx.indexOf(selectedIdx)>-1) {
          $scope.$apply(function() {
            $scope.selectedImage = selectedIdx;
          });
        }
      });


      /*
      player.onDisplayClick(function() {
        $log.log('onDisplayClick');
        $scope.toggleCarousel = false;
      });
      */
    });

    var showPC = function(status) {
      $scope.$apply(function() {
        status = status || !$scope.showCarousel;
        $scope.showCarousel = status;
      });
    };

    $scope.toggleCarousel = function() {
      $log.log('toggleCarousel');
      $scope.showCarousel = !$scope.showCarousel;
    };

    $scope.imageClick = function(idx, $event) {
      $log.log('imageClick', idx);
      $event.stopPropagation();
      $scope.selectedImage = idx;

      player.seek(idx * 30);
    };

    $scope.glassClick = function($event) {
      var pc = angular.element('#pc');
      $log.log('Glass click', $event.clientX, $event.clientY, pc);
      $scope.showCarousel = false;

      //player.play(true);
      //angular.element('#' + videoId).trigger("click", $event);
    };
  });
