'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VideoSchema = new Schema({
  url: { type: String, required: true },
  title: { type: String },
  image: { type: String },
  items: { type : Array , "default" : [] },
  user: { type : Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('Video', VideoSchema);