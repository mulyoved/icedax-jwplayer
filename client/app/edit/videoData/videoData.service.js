'use strict';

angular.module('icedaxJwplayerApp')
  .service('videoData', function (Restangular, $log, $q, config_debug) {
    var vd = this;
    this.dirty = false;

    this.id = null;
    this.create = function() {
      var data;

      if (true) { // !config_debug) {
        data = {
          url: null,
          image: null,
          title: null,
          items: []
        };
      }
      else {
        data = {
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
      }

      this.data = Restangular.restangularizeElement('', data, 'videos');
    };

    // return promise
    this.save = function() {
      var deferred = $q.defer();

      if (this.data.fromServer) {
        this.data.put().then(function(answer) {
          $log.log('Saved existing video', answer);
          deferred.resolve(answer);
        }, function(err) {
          $log.error('Failed to save existing video', err);
          deferred.reject(err);
        });
      }
      else {
        Restangular.all('videos').post(this.data).then(function(answer) {
          $log.log('Saved new video', answer);
          vd.id = answer._id;
          deferred.resolve(answer);
        }, function(err) {
          $log.error('Failed to save new video', err);
          deferred.reject(err);
        });
      }

      return deferred.promise;
    };

    // return promise
    this.get = function(id) {
      var deferred = $q.defer();
      var self = this;
      Restangular.one('videos', id).get().then(function(answer) {
        self.data = answer;
        self.id = answer._id;
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
