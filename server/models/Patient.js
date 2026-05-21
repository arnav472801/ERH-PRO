const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  bloodGroup: {
    type: String,
  },
  allergies: [{
    type: String,
  }],
  contact: {
    type: String,
    required: true,
  },
  emergencyContact: {
    type: String,
  },
  insurance: {
    type: String,
  },
  existingConditions: [{
    type: String,
  }]
}, {
  timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
