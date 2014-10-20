'use strict';

describe('Controller: ImagepanelCtrl', function () {

  // load the controller's module
  beforeEach(module('icedaxJwplayerApp'));

  var ImagepanelCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImagepanelCtrl = $controller('ImagepanelCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
