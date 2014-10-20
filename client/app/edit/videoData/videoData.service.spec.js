'use strict';

describe('Service: videoData', function () {

  // load the service's module
  beforeEach(module('icedaxJwplayerApp'));

  // instantiate service
  var videoData;
  beforeEach(inject(function (_videoData_) {
    videoData = _videoData_;
  }));

  it('should do something', function () {
    expect(!!videoData).toBe(true);
  });

});
