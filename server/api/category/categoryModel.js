var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaOptions = {usePushEach: true}

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, schemaOptions);

module.exports = mongoose.model('category', CategorySchema);
