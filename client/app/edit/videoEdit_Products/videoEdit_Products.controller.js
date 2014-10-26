'use strict';

angular.module('icedaxJwplayerApp')
  .controller('VideoeditProductsCtrl', function ($scope, $log, $location, videoData, config_debug) {
    $scope.selectedImage = -1;
    $scope.items = videoData.data.items;
    $scope.config_debug = config_debug;

    $scope.isSelected = function(idx) {
      return (idx === $scope.selectedImage ? 'selected-icon' : null);
    };

    $scope.isNewSelected = function() {
      return ($scope.selectedImage === -1 ? 'selected-icon' : null);
    };

    function setSelectedImage(idx) {
      if (idx === -1) {
        $scope.newProduct();
      }
      else {
        $log.log('setSelectedImage', idx);
        $scope.selectedImage = idx;
        $scope.model = videoData.data.items[idx];
        $scope.masterCopy = angular.copy($scope.model);
        $scope.product.form.$setPristine();
      }
    }

    $scope.imageClick = function(idx, $event) {
      $log.log('imageClick', idx, $scope.product.form.$pristine);

      if ($scope.selectedImage === idx && idx !== -1) {
        var image = videoData.data.items[idx];
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
      //$log.log('New Product');
      $scope.selectedImage = -1;
      $scope.model = CreateCleanModel($scope.schema);
      $scope.masterCopy = angular.copy($scope.model);

      angular.element('.selector').focus();
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
        ngModelOptions: { updateOn: 'default' }
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

    var formIsEmpty = function() {
      var isEmpty = true;
      angular.forEach($scope.model, function(value, key) {
        if (!angular.isUndefined(value)) {
          isEmpty = false;
        }
      });

      return isEmpty;
    };

    $scope.updateItem = function() {
      $log.log('Update Item', $scope.model);
      var isNew = $scope.selectedImage === -1;

      if (isNew) {
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
    };

    $scope.save = function(form) {
      $log.log('Submiting', form, $scope.model);

      // First we broadcast an event so all fields validate themselves
      $scope.$broadcast('schemaFormValidate');

      if (formIsEmpty()) {
        return true;
      }

      // Then we check if the form is valid
      if (form.$valid) {
        $scope.updateItem();

        var isNew = $scope.selectedImage === -1;
        if (isNew) {
          $scope.newProduct();
        }
        else {
          $scope.selectedImage = videoData.data.items.indexOf($scope.model);
          $scope.product.form.$setPristine();
        }

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

    if (videoData.data.items > 0) {
      setSelectedImage(0);
    }
    else {
      $scope.newProduct();
    };

    $scope.fillSampleData = function() {
      var id = $scope.items.length + 1;
      $scope.model.url = 'https://www.kickstarter.com/projects/getify/you-dont-know-js-book-series';
      $scope.model.name = 'Product' + id;
      $scope.model.description = 'Product' + id;
      $scope.model.imageurl = 'http://placehold.it/120x120/ffffff/000000/&text=' + $scope.model.name;
      $scope.model.cost = 10 + id ;
      $scope.model.position = 30 * id;
    };

    $scope.deleteProduct = function() {
      if ($scope.selectedImage === -1) {
        $scope.resetForm();
      }
      else {
        videoData.data.items.splice($scope.selectedImage, 1);
        if ($scope.selectedImage >= videoData.data.items.length) {
          setSelectedImage(videoData.data.items.length-1);
        }
      }
    };

    $scope.$watch('model.imageurl', function() {
      //$log.log('model.imageurl', $scope.model.imageurl);
      if (!angular.isUndefined($scope.model.imageurl) && $scope.model.imageurl.length > 4) {
        $scope.updateItem();
      }
    });

    videoData._isModelValid = function() {
      return ($scope.product.form.$pristine || $scope.save($scope.product.form));
    };
  });
