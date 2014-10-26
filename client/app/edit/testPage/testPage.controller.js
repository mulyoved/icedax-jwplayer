'use strict';

angular.module('icedaxJwplayerApp')
  .controller('TestpageCtrl', function ($scope, $location, $http, $log, Auth, messageCenterService, videoData, Restangular) {
    $scope.message = 'Hello';
    $log.log('TestpageCtrl Started');

    $scope.showMessage = function() {
      messageCenterService.add('success', 'Your action has been completed!', { status: messageCenterService.status.permanent });
    };

    $scope.goToAdmin = function() {
      $location.url('/admin');
    };

    $scope.getYouTubeSearch = function() {
      var request = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=misskittin&key=AIzaSyAAR_k2X4wJeePfIhkJrvjj_dho9R9nPaw';
      //var request = 'https://gdata.youtube.com/feeds/api/videos?alt=json&orderby=relevance&max-results=6&v=2&q=base';
      $http.get(request).success(function(data) {
        $log.log('getYouTubeSearch', data);
      });
    };

    /*
    $scope.searchYouTubeParams = function(q) {
      $log.log('searchYouTube', q);
      return {
        q: q,
        key: 'AIzaSyAAR_k2X4wJeePfIhkJrvjj_dho9R9nPaw',
        type: 'video',
        maxResults: '8',
        part: 'id,snippet',
        fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle'
      };
    };
    */

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
          image: item.snippet.thumbnails.default.url
        })
      });

      return { items: results };
    };

    $scope.schema = {
      type: "object",
      properties: {
        url: { type: "string", format: "url", required: true, title: "Product Page URL", description: "Copy product page URL, should contain product description and option to buy the product."},
        name: { type: "string", minLength: 2, title: "Product Name", description: "Name or alias" },
        description: {
          type: "string"
        },
        imageurl: { type: "string", format: "url", required: true, title: "Product Image URL", description: "Copy product image URL, will be included in the video as thumbnail."},
        cost: { type: "number", title: "Product Price" },
        position: { type: "integer", required: true, title: "Position in Video",  description: "Position in seconds where the product appear in the video."},
      }
    };

    $scope.form = [
      { key: 'url' },
      { key: 'name' } /*,

      { key: 'description' },
      { key: 'imageurl',
        ngModelOptions: { updateOn: 'default ' }
      },
      { key: 'cost' },
      { key: 'position' },
      {
        type: 'actions',
        items: [
          {
            type: "submit",
            style: 'btn-primary',
            title: "Save"
          },
          {
            type: "button",
            style: 'btn-warning',
            title: "Cancel",
            onClick: $scope.resetForm
          }
        ]
      }
      */
    ];

    $scope.saveVideoToDB = function() {
      videoData.create();
      var data = videoData.data;

      //data.user = Auth.getCurrentUser()._id;

      var rdata = Restangular.restangularizeElement('', data, 'videos');
      var videos = Restangular.all('videos');

      $log.log('going to post saveVideoToDB', data, rdata);
      videos.post(rdata).then(function() {
        console.log("Object saved OK");
      }, function(err) {
        console.log("There was an error saving", err);
      });
    };

    $scope.retriveVideoFromDB = function() {
      var id = "5447a9df6db379681089e842"; // 6373;
      var video = Restangular.one('videos', id).get().then(function(answer) {
        $log.log('retriveVideoFromDB', answer);
      });
    };

    $scope.retriveAllVideoFromDB = function() {
      var videos = Restangular.all('videos');
      videos.getList().then(function(videos) {
        $log.log('retriveVideoFromDB', videos);
      });
    };

    $scope.retriveUserVideoFromDB = function() {
      var videos = Restangular.all('videos');
      videos.getList().then(function(videos) {
        angular.forEach(videos, function(video) {
          $log.log(video);
        });
      });
    };

    $scope.service_saveSameVideoToDB = function() {
      videoData.save().then(function(answer) {
        $log.log('save', answer);
      }, function(err) {
        $log.error('failed to save');
      });
    };

    $scope.service_saveNewVideoToDB = function() {
      videoData.create();
      videoData.data.id = 12;
      videoData.data.items = [
        { name: 'item1' },
        { name: 'item2' }
      ];

      videoData.save().then(function(answer) {
        $log.log('save', answer);
      }, function(err) {
        $log.error('failed to save');
      });
    };

    $scope.service_retriveVideoFromDB = function() {
      var id = '5447a9df6db379681089e842';
      videoData.get(id).then(function(answer) {
        $log.log('retrived', answer);
        $log.log('retrived', videoData.data);
      }, function(err) {
        $log.error('failed to get');
      });
    };

    $scope.service_updateExistingVideoFromDB = function() {
      videoData.data.items[0].name = 'update';
      videoData.save().then(function(answer) {
        $log.log('save', answer);
      }, function(err) {
        $log.error('failed to save');
      });
    };

    $scope.getUser = function() {
      $log.log('Get user', Auth.getCurrentUser());
    };

    $scope.debugCode = function() {
      $log.log('debugCode',1.9);
    };

    $scope.debugCode2 = function() {
      $log.log('debugCode2',1.9);
    };

    $scope.debugCode3 = function() {
      $log.log('debugCode3',1.99);
    };

    $scope.debugCode4 = function() {
      $log.log('debugCode4',1.9);
    };

  });
