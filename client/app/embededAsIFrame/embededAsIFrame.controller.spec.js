'use strict';

describe('Controller: EmbededasiframeCtrl', function () {

  // load the controller's module
  beforeEach(module('icedaxJwplayerApp'));

  var EmbededasiframeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmbededasiframeCtrl = $controller('EmbededasiframeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
