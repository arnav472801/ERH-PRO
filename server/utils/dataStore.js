const fs = require('fs');
const path = require('path');

const STORE_PATH = path.resolve(__dirname, '../data/store.json');

const ensureStore = () => {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(STORE_PATH)) {
    fs.writeFileSync(STORE_PATH, JSON.stringify({ patients: [], records: [] }, null, 2));
  }
};

const readStore = () => {
  ensureStore();
  const raw = fs.readFileSync(STORE_PATH, 'utf8');
  try {
    return JSON.parse(raw);
  } catch {
    return { patients: [], records: [] };
  }
};

const writeStore = (store) => {
  ensureStore();
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
};

const generateId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getPatients = () => {
  const { patients } = readStore();
  return patients;
};

const getPatientById = (id) => getPatients().find((patient) => patient._id === id);

const addPatient = (patient) => {
  const store = readStore();
  store.patients.unshift(patient);
  writeStore(store);
  return patient;
};

const updatePatient = (updatedPatient) => {
  const store = readStore();
  store.patients = store.patients.map((patient) =>
    patient._id === updatedPatient._id ? updatedPatient : patient
  );
  writeStore(store);
  return updatedPatient;
};

const getRecordsByPatientId = (patientId) => {
  const { records } = readStore();
  return records.filter((record) => record.patientId === patientId);
};

const addRecord = (record) => {
  const store = readStore();
  store.records.unshift(record);
  writeStore(store);
  return record;
};

module.exports = {
  getPatients,
  getPatientById,
  addPatient,
  updatePatient,
  getRecordsByPatientId,
  addRecord,
  generateId,
};
