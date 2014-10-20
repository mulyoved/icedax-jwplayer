'use strict';

describe('Controller: DetailpanelCtrl', function () {

  // load the controller's module
  beforeEach(module('icedaxJwplayerApp'));

  var DetailpanelCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DetailpanelCtrl = $controller('DetailpanelCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
