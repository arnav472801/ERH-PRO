const dataStore = require('../utils/dataStore');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private
const getPatients = (req, res) => {
  const patients = dataStore.getPatients();
  res.json(patients);
};

// @desc    Get single patient by ID
// @route   GET /api/patients/:id
// @access  Private
const getPatientById = (req, res) => {
  const patient = dataStore.getPatientById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ message: 'Patient not found' });
  }
};

// @desc    Create a new patient
// @route   POST /api/patients
// @access  Private
const createPatient = (req, res) => {
  const { name, dob, gender, bloodGroup, contact, emergencyContact, insurance, allergies, existingConditions } = req.body;

  const patient = {
    _id: dataStore.generateId(),
    createdAt: new Date().toISOString(),
    name,
    dob,
    gender,
    bloodGroup,
    contact,
    emergencyContact,
    insurance,
    allergies: allergies || [],
    existingConditions: existingConditions || [],
  };

  const createdPatient = dataStore.addPatient(patient);
  res.status(201).json(createdPatient);
};

// @desc    Update a patient
// @route   PUT /api/patients/:id
// @access  Private
const updatePatient = (req, res) => {
  const { name, dob, gender, bloodGroup, contact, emergencyContact, insurance, allergies, existingConditions } = req.body;
  const patient = dataStore.getPatientById(req.params.id);

  if (patient) {
    const updatedPatient = {
      ...patient,
      name: name || patient.name,
      dob: dob || patient.dob,
      gender: gender || patient.gender,
      bloodGroup: bloodGroup || patient.bloodGroup,
      contact: contact || patient.contact,
      emergencyContact: emergencyContact || patient.emergencyContact,
      insurance: insurance || patient.insurance,
      allergies: allergies || patient.allergies,
      existingConditions: existingConditions || patient.existingConditions,
    };

    dataStore.updatePatient(updatedPatient);
    res.json(updatedPatient);
  } else {
    res.status(404).json({ message: 'Patient not found' });
  }
};

module.exports = {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
};
