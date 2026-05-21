const dataStore = require('../utils/dataStore');

// @desc    Get all records for a specific patient
// @route   GET /api/records/patient/:patientId
// @access  Private
const getPatientRecords = (req, res) => {
  const records = dataStore.getRecordsByPatientId(req.params.patientId);
  res.json(records);
};

// @desc    Add a medical record
// @route   POST /api/records
// @access  Private
const addMedicalRecord = (req, res) => {
  const { patientId, recordType, diagnosis, medications, visitNotes, labReports } = req.body;

  const record = {
    _id: dataStore.generateId(),
    patientId,
    doctorId: 'local',
    recordType,
    diagnosis,
    medications: medications || [],
    visitNotes,
    labReports: labReports || [],
    createdAt: new Date().toISOString(),
  };

  const createdRecord = dataStore.addRecord(record);
  res.status(201).json(createdRecord);
};

module.exports = {
  getPatientRecords,
  addMedicalRecord,
};
