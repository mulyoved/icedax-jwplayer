'use strict';

angular.module('icedaxJwplayerApp')
  .controller('JwplayerSimpleCtrl', function ($scope, $log) {
    angular.element(document).ready(function () {
      console.log('Document Ready');

      var videoId = 'playerADWzMGbKsCCQ';

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
        },

        'show-product' //And finally, here we set the unique ID of the button itself.
      );

      var player = jwplayer();
        player.onReady(function() {
        var video = angular.element('#' + videoId);
        var pc = angular.element('#pc');
        pc.appendTo('#' + videoId);
        console.log('ready', player.getWidth(), player.getHeight(), pc);
      });

    });

    $scope.toggleCarousel = function() {
      
    }
  });
