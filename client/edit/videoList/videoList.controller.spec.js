'use strict';

describe('Controller: VideolistCtrl', function () {

  // load the controller's module
  beforeEach(module('icedaxJwplayerApp'));

  var VideolistCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VideolistCtrl = $controller('VideolistCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
