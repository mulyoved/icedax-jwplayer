'use strict';

angular.module('icedaxJwplayerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit.videoEdit.videoEdit_Select', {
        url: '/videoEdit_Select',
        templateUrl: 'app/edit/videoEdit_Select/videoEdit_Select.html',
        controller: 'VideoeditSelectCtrl' ,

        resolve:
        {
          videoList: function(videoData) {
            return videoData.list()
          }
        }
      });
  });