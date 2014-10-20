'use strict';

describe('Controller: VideoeditCtrl', function () {

  // load the controller's module
  beforeEach(module('icedaxJwplayerApp'));

  var VideoeditCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VideoeditCtrl = $controller('VideoeditCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
