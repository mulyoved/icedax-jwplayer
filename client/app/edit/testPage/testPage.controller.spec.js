'use strict';

describe('Controller: TestpageCtrl', function () {

  // load the controller's module
  beforeEach(module('icedaxJwplayerApp'));

  var TestpageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestpageCtrl = $controller('TestpageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
