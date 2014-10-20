'use strict';

describe('Controller: LendingpageCtrl', function () {

  // load the controller's module
  beforeEach(module('icedaxJwplayerApp'));

  var LendingpageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LendingpageCtrl = $controller('LendingpageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
