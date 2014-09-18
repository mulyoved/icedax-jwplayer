'use strict';

angular.module('icedaxJwplayerApp')
  .controller('JwplayerSimpleCtrl', function ($scope, $log) {
    var videoId = 'playerADWzMGbKsCCQ';
    var player;
    $scope.showCarousel = false;

    $scope.imagesIdx = [1,2,3,4,5,6,7,8];

    $scope.imageClick = function(idx) {
      $log.log('imageClick', idx)
    };


    angular.element(document).ready(function () {
      console.log('Document Ready');


      jwplayer(videoId).setup({
        file: '//www.youtube.com/watch?v=GeLw1iFoXho',
        title: 'Miss Kittin & The Hacker - Frank Sinatra (Full Version no bullshit)',
        width: '100%',
        aspectratio: '16:9'
      }).addButton(
        'http://placehold.it/64x64&text=image1',
        'Show Products',
        function() {
          console.log('Show Products', jwplayer());
          //window.location.href = jwplayer().getPlaylistItem()['file'];
          $scope.$apply(function() {
            $scope.showCarousel = true;
          });
        },

        'show-product' //And finally, here we set the unique ID of the button itself.
      );

      player = jwplayer();
      player.onReady(function() {
        var video = angular.element('#' + videoId);
        var pc = angular.element('#pc');
        var videoGlass = angular.element('#video-glass');
        //pc.appendTo('#' + videoId);
        videoGlass.appendTo('#' + videoId);
        console.log('ready', player.getWidth(), player.getHeight(), pc);


        $scope.$apply(function() {
          $scope.showCarousel = true;
        });

        player.onSeek(function player_onSeek(e) {
          $log.log('onSeek', e);
        });


      });

      /*
      player.onDisplayClick(function() {
        $log.log('onDisplayClick');
        $scope.toggleCarousel = false;
      });
      */
    });

    $scope.toggleCarousel = function() {
      $log.log('toggleCarousel');
      $scope.showCarousel = !$scope.showCarousel;
    };

    $scope.glassClick = function($event) {
      var pc = angular.element('#pc');
      $log.log('Glass click', $event.clientX, $event.clientY, pc);
      //$scope.showCarousel = false;

      //player.play(true);
      //angular.element('#' + videoId).trigger("click", $event);
    };

    $scope.pcClick = function($event) {
      $log.log('Carousel Click', $event);
      $event.stopPropagation();
    };

  });
