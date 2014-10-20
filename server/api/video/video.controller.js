'use strict';

var _ = require('lodash');
var Video = require('./video.model');

// Get list of videos
exports.index = function(req, res) {
  console.log('vidoes.index req.user', req.user);
  Video.find({user: req.user._id}, function (err, videos) {
    if(err) { return handleError(res, err); }
    return res.json(200, videos);
  });
};

// Get a single video
exports.show = function(req, res) {
  console.log('vidoes.show req.user', req.params.id);
  Video.findById(req.params.id, function (err, video) {
    if(err) { return handleError(res, err); }
    if(!video) { return res.send(404); }
    return res.json(video);
  });
};

// Creates a new video in the DB.
exports.create = function(req, res) {
  console.log('Create', req.body);

  var video = req.body;
  video.user = req.user._id;

  Video.create(req.body, function(err, video) {
    if(err) {
      console.log('Failed to create video', err);
      return handleError(res, err);
    }
    return res.json(201, video);
  });
};

// Updates an existing video in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Video.findById(req.params.id, function (err, video) {
    console.log('Video.findById', err, video);
    if (err) { return handleError(res, err); }
    if(!video) { return res.send(404); }
    var updated = _.merge(video, req.body);
    updated.markModified('items');
    updated.save(function (err) {
      console.log('Video.updated', err, video);
      if (err) { return handleError(res, err); }
      return res.json(200, video);
    });
  });
};

// Deletes a video from the DB.
exports.destroy = function(req, res) {
  Video.findById(req.params.id, function (err, video) {
    if(err) { return handleError(res, err); }
    if(!video) { return res.send(404); }
    video.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}