'use strict';

angular.module('icedaxJwplayerApp')
  .controller('VideoeditSelectCtrl', function ($scope, $location, $log, videoData, videoList) {

    $scope.url = false;
    $scope.selectedVideo = null;

    $scope.$watch('selectedVideo', function(data) {
      if (data) {
        var url = '//www.youtube.com/watch?v=' + data.originalObject.id.videoId;
        $log.log('Selected new video', data, url);
        $scope.selectVideo(url, data.title, data.image);
      }
    });


    $scope.searchYouTubeParams = function(q) {
      $log.log('searchYouTube', q);
      return {
        q: q,
        key: 'AIzaSyAAR_k2X4wJeePfIhkJrvjj_dho9R9nPaw',
        type: 'video',
        maxResults: '6',
        part: 'id,snippet',
        fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle'
      };
    };

    $scope.getYouTubeResults = function(answer) {
      $log.log('getYouTubeResults', answer);
      var results = [];
      angular.forEach(answer.items, function(item) {
        results.push( {
          title: item.snippet.title,
          description: item.snippet.description,
          image: item.snippet.thumbnails.default.url,
          id: item.id
        })
      });

      return { items: results };
    };

    $scope.selectVideo = function(url, title, image) {
      $log.log('selectVideo', url, title, image);

      $scope.url = url;

      videoData.url = url;
      videoData.title = title;
      videoData.image = image;

      jwplayer('playerNqOtsMizrHdj').setup({
        file: url,
        title: 'Function - Psychic Warfare',
        width: '640',
        height: '360'
      });
    };

    $scope.next = function() {
      $location.path('/edit/videoEdit/videoEdit_Products');
    };

    $scope.selectExistingVideo = function(video) {
      $scope.selectVideo('//'+video.url, video.title, video.image);
    };

    $scope.videos = videoList; //[ 1,2,3,4,5];
    $log.log('Videos', videoList);
  });
