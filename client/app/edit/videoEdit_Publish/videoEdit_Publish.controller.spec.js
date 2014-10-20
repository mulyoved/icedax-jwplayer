'use strict';

describe('Controller: VideoeditPublishCtrl', function () {

  // load the controller's module
  beforeEach(module('icedaxJwplayerApp'));

  var VideoeditPublishCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VideoeditPublishCtrl = $controller('VideoeditPublishCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
