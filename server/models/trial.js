const mongoose = require('mongoose');

var trialSchema = new mongoose.Schema({
  cursorPos: {
    type: Array,
    required: true
  },
  handPos: {
    type: Array,
    required: true
  },
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
  },
  trial: {
    type: Number,
    required: true
  },
  dVelocity: {
    type: Array,
    required: false
  }
});



var Trial = mongoose.model('Trial', trialSchema);

module.exports = {
  Trial,
};
