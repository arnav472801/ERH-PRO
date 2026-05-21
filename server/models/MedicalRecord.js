const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recordType: {
    type: String,
    enum: ['OPD Visit', 'Prescription', 'Diagnosis', 'Lab Result', 'Radiology', 'Surgery'],
    default: 'OPD Visit',
  },
  diagnosis: {
    type: String,
  },
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String,
  }],
  visitNotes: {
    type: String,
  },
  labReports: [{
    reportName: String,
    fileUrl: String, // Path to the uploaded file if applicable
    date: Date,
  }]
}, {
  timestamps: true
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
module.exports = MedicalRecord;
