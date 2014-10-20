'use strict';

angular.module('icedaxJwplayerApp')
  .service('videoData', function (Restangular, $log, $q) {
    this.dirty = false;

    this.create = function() {
      /*
      var data = {
        url: null,
        image: null,
        title: null,
        items: []
      };
      */

      var data = {
        url: 'www.youtube.com/watch?v=zOt6ppIBOd4',
        image: 'https://i.ytimg.com/vi/zOt6ppIBOd4/default.jpg',
        title: 'Frank - I Love You All',
        items: [
          {
            url: "http://codepen.io/mulyoved/pen/FcLIs",
            name: "Sample 1",
            description: "",
            imageurl: "http://placehold.it/120x120/ffffff/000000/&text=image1",
            cost: 100,
            position: 30
          },
          {
            url: "http://codepen.io/mulyoved/pen/FcLIs",
            name: "Sample 2",
            description: "",
            imageurl: "http://placehold.it/120x120/ffffff/000000/&text=image2",
            cost: 100,
            position: 60
          },
          {
            url: "http://codepen.io/mulyoved/pen/FcLIs",
            name: "Sample 3",
            description: "",
            imageurl: "http://placehold.it/120x120/ffffff/000000/&text=image3",
            cost: 100,
            position: 90
          }
        ]
      };

      this.data = Restangular.restangularizeElement('', data, 'videos');
    };

    // return promise
    this.save = function() {
      if (this.data.fromServer) {
        return this.data.put();
      }
      else {
        return Restangular.all('videos').post(this.data);
      }
    };

    // return promise
    this.get = function(id) {
      var deferred = $q.defer();
      var self = this;
      Restangular.one('videos', id).get().then(function(answer) {
        self.data = answer;
        deferred.resolve(answer);
      }, function(err) {
        $log.error('Failed to retrieve video data', err);
        deferred.reject(err);
      });

      return deferred.promise;
    };

    this.list = function() {
      var videos = Restangular.all('videos');
      return videos.getList();
    }
  });
