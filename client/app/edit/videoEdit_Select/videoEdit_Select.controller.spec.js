'use strict';

describe('Controller: VideoeditSelectCtrl', function () {

  // load the controller's module
  beforeEach(module('icedaxJwplayerApp'));

  var VideoeditSelectCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VideoeditSelectCtrl = $controller('VideoeditSelectCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
