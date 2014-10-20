'use strict';

describe('Controller: VideoeditProductsCtrl', function () {

  // load the controller's module
  beforeEach(module('icedaxJwplayerApp'));

  var VideoeditProductsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VideoeditProductsCtrl = $controller('VideoeditProductsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
