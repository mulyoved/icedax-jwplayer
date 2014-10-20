'use strict';

describe('Controller: EmbededvideodbCtrl', function () {

  // load the controller's module
  beforeEach(module('icedaxJwplayerApp'));

  var EmbededvideodbCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmbededvideodbCtrl = $controller('EmbededvideodbCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
