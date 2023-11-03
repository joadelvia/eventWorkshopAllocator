const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

const workshopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  totalCapacity: {
    type: Number,
    required: true,
  },
  groups: [groupSchema]
});

module.exports = mongoose.model('Workshop', workshopSchema);
