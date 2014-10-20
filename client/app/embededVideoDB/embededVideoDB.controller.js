'use strict';

angular.module('icedaxJwplayerApp')
  .controller('EmbededvideodbCtrl', function ($scope, $log, $stateParams, Restangular) {

    $log.log('$stateParams', $stateParams.videoId);

    var elementReady = false;
    var videoDbId = $stateParams.videoId;
    var videoId = 'playerADWzMGbKsCCQ';
    var player;

    $scope.showCarousel = false;
    $scope.selectedImage = 0;

    $scope.isSelected = function(idx) {
      return (idx === $scope.selectedImage ? 'selected-img' : null);
    };

    $scope.images = [];

    /*
    $scope.images = [
      {
        imageurl: 'http://placehold.it/100x100&text=image1',
        position: 30,
        name: 'Product1',
        description: 'Product1 Description',
        url: 'http://www.ebay.com/itm/Apple-iPad-3-3rd-Gen-64GB-Wi-Fi-Retina-Tablet-4G-AT-T-WHITE-MD371LL-A-/171420012066',
        price: 100
      },
      {
        imageurl: 'http://placehold.it/100x100&text=image2',
        position: 60,
        name: 'Product2',
        description: 'Product2 Description',
        url: 'http://www.ebay.com/itm/Apple-iPad-3-3rd-Gen-64GB-Wi-Fi-Retina-Tablet-4G-AT-T-WHITE-MD371LL-A-/171420012066',
        price: 100
      },
      {
        imageurl: 'http://placehold.it/100x100&text=image3',
        position: 90,
        name: 'Product3',
        description: 'Product3 Description',
        url: 'http://www.ebay.com/itm/Apple-iPad-3-3rd-Gen-64GB-Wi-Fi-Retina-Tablet-4G-AT-T-WHITE-MD371LL-A-/171420012066',
        price: 100
      },
      {
        imageurl: 'http://placehold.it/100x100&text=image4',
        position: 120,
        name: 'Product4',
        description: 'Product4 Description',
        url: 'http://www.ebay.com/itm/Apple-iPad-3-3rd-Gen-64GB-Wi-Fi-Retina-Tablet-4G-AT-T-WHITE-MD371LL-A-/171420012066',
        price: 100
      },
      {
        imageurl: 'http://placehold.it/100x100&text=image5',
        position: 150,
        name: 'Product5',
        description: 'Product5 Description',
        url: 'http://www.ebay.com/itm/Apple-iPad-3-3rd-Gen-64GB-Wi-Fi-Retina-Tablet-4G-AT-T-WHITE-MD371LL-A-/171420012066',
        price: 100
      },
      {
        imageurl: 'http://placehold.it/100x100&text=image6',
        position: 180,
        name: 'Product6',
        description: 'Product6 Description',
        url: 'http://www.ebay.com/itm/Apple-iPad-3-3rd-Gen-64GB-Wi-Fi-Retina-Tablet-4G-AT-T-WHITE-MD371LL-A-/171420012066',
        price: 100
      },
      {
        imageurl: 'http://placehold.it/100x100&text=image7',
        position: 210,
        name: 'Product7',
        description: 'Product7 Description',
        url: 'http://www.ebay.com/itm/Apple-iPad-3-3rd-Gen-64GB-Wi-Fi-Retina-Tablet-4G-AT-T-WHITE-MD371LL-A-/171420012066',
        price: 100
      }
    ];
    */

    angular.element(document).ready(function () {
      $log.log('Document Ready');
      elementReady = true;
    });

    var setupVideo = function(url, title, images) {
      $log.log('setupVideo', url, title, images.length);

      $scope.images = images;

      jwplayer(videoId).setup({
        file: '//'+url,
        title: title,
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
        initImagePanel();
        //startLoad();
      });

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
        try {
          //$log.log('onTime', e.duration, e.position);
          var pos = e.position;
          var selectedIdx = 0;
          for (i = $scope.images.length - 1; i >= 0; i--) {
            var image = $scope.images[i];
            if (image.position <= pos) {
              $log.log('Selected image', i);
              selectedIdx = i;
              break;
            }
          }

          if (selectedIdx != $scope.selectedImage && selectedIdx > -1) {
            $scope.$apply(function () {
              $scope.selectedImage = selectedIdx;
            });
          }
        }
        catch(err) {
          $log.error(player.onTime, err);
        }
      });
    };

    var startLoad = function() {
      Restangular.one('videos', videoDbId).get().then(function(answer) {
        $log.log('Recived answer from server', answer, elementReady);
        if (elementReady) {
          setupVideo(answer.url, answer.title, answer.items);
        }
      }, function(err) {
        $log.error('Failed to retrieve video data', err);
      });
    };

    var initImagePanel = function() {
      var video = angular.element('#' + videoId);
      var pc = angular.element('#pc');
      var videoGlass = angular.element('#video-glass');
      videoGlass.appendTo('#' + videoId);

      var dock = angular.element('#video-glass');
      console.log('ready', player.getWidth(), player.getHeight(), player);

      showPC(true);
    };

    var showPC = function(status) {
      $scope.$apply(function() {
        if ($scope.images.length > 0) {
          status = status || !$scope.showCarousel;
          $scope.showCarousel = status;
        }
        else {
          $scope.showCarousel = false;
        }
      });
    };

    $scope.toggleCarousel = function() {
      $log.log('toggleCarousel');
      $scope.showCarousel = !$scope.showCarousel;
    };

    $scope.imageClick = function(idx, $event) {
      $log.log('imageClick', idx);
      $event.stopPropagation();
      var image = $scope.images[idx];

      if ($scope.selectedImage === idx) {
        $log.log('open external url', image.url);
        window.open(image.url, '_blank');
      }
      else {
        $scope.selectedImage = idx;
        player.seek(image.position);
      }
    };

    $scope.glassClick = function($event) {
      var pc = angular.element('#pc');
      $log.log('Glass click', $event.clientX, $event.clientY, pc);
      $scope.showCarousel = false;
    };

    startLoad();
  });
