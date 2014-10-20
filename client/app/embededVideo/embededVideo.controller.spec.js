'use strict';

describe('Controller: EmbededvideoCtrl', function () {

  // load the controller's module
  beforeEach(module('icedaxJwplayerApp'));

  var EmbededvideoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmbededvideoCtrl = $controller('EmbededvideoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
