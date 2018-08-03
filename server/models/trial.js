const mongoose = require('mongoose');

var trialSchema = new mongoose.Schema({
  cursorPosX: {
    type: Array,
    required: true
  },
  cursorPosY: {
    type: Array,
    required: true
  },
  handPosX: {
    type: Array,
    required: true
  },
  handPosY: {
    type: Array,
    required: true
  }
});



var Trial = mongoose.model('Trial', trialSchema);

module.exports = {
  Trial,
};
