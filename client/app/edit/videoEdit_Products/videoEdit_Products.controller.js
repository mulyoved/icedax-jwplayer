'use strict';

angular.module('icedaxJwplayerApp')
  .controller('VideoeditProductsCtrl', function ($scope, $log, $location, videoData) {
    $scope.selectedImage = 0;
    $scope.items = videoData.data.items;

    $scope.isSelected = function(idx) {
      return (idx === $scope.selectedImage ? 'selected-icon' : null);
    };

    $scope.isNewSelected = function() {
      return ($scope.selectedImage === -1 ? 'selected-icon' : null);
    };

    function setSelectedImage(idx) {
      $scope.selectedImage = idx;
      $scope.model = videoData.data.items[idx];
      $scope.masterCopy = angular.copy($scope.model);
    }

    $scope.imageClick = function(idx, $event) {
      $log.log('imageClick', idx);
      var image = videoData.data.items[idx];

      if ($scope.selectedImage === idx) {
        $log.log('open external url', image.url);
      }
      else {
        if ($scope.product.form.$pristine || $scope.save($scope.product.form)) {
          setSelectedImage(idx);
        }
      }
    };

    function CreateCleanModel(schema) {
      var keys = {};
      for (var key in $scope.schema.properties) {
        if ($scope.schema.properties.hasOwnProperty(key)) {
          keys[key] = '';
        }
      }

      return keys;
    }

    $scope.newProduct = function() {
      $log.log('New Product');
      $scope.selectedImage = -1;
      $scope.model = CreateCleanModel($scope.schema);
      $scope.masterCopy = angular.copy($scope.model);
    };

    $scope.resetForm = function() {
      $log.log('resetForm');
      $scope.model = angular.copy($scope.masterCopy);
      $scope.product.form.$setPristine();
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
      { key: 'name' },
      { key: 'description' },
      { key: 'imageurl',
        ngModelOptions: { updateOn: 'default ' }
      },
      { key: 'cost' },
      { key: 'position' } /*,
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

    $scope.model = {
    };

    $scope.onSubmit = function(form) {
      $scope.save(form);
    };

    $scope.save = function(form) {
      $log.log('Submiting', form, $scope.model);
      // First we broadcast an event so all fields validate themselves
      $scope.$broadcast('schemaFormValidate');

      // Then we check if the form is valid
      if (form.$valid) {
        $log.log('Submiting All is valid', $scope.model);

        if ($scope.selectedImage === -1) {
          videoData.data.items.push($scope.model);
          $scope.selectedImage = videoData.data.items.length-1;
        }
        else {
          videoData.data.items[$scope.selectedImage] = $scope.model;
        }

        videoData.data.items.sort(function(a,b) {
          if (a.position < b.position)
            return -1;
          if (a.position > b.position)
            return 1;
          return 0;
        });

        $scope.selectedImage = videoData.data.items.indexOf($scope.model);

        return true;
      }
      else {
        //messageCenterService.add('danger', 'Form contain some errors, please fix');
        $log.log('Submiting, Validation Failed', $scope.model);
        return false;
      }
    };

    tv4.addFormat('url', function (data, schema) {
      if (!validator.isURL(data)) {
        return 'url validation error message';
      }
      else {
        return null;
      }
    });

    $scope.next = function() {
      $location.path('/edit/videoEdit/videoEdit_Publish');
    };

    setSelectedImage(0);
  });
