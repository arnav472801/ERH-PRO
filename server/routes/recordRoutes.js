const express = require('express');
const router = express.Router();
const { getPatientRecords, addMedicalRecord } = require('../controllers/recordController');

router.route('/')
  .post(addMedicalRecord);

router.route('/patient/:patientId')
  .get(getPatientRecords);

module.exports = router;
