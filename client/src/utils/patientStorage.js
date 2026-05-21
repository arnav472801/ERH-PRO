const PATIENTS_KEY = 'erhpro_patients';
const RECORDS_KEY = 'erhpro_records';

const safeJsonParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const readPatients = () => {
  if (typeof window === 'undefined') return [];
  return safeJsonParse(window.localStorage.getItem(PATIENTS_KEY), []);
};

const savePatients = (patients) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
};

const getPatients = () => readPatients();

const getPatientById = (id) => getPatients().find((patient) => patient._id === id);

const addPatient = (patient) => {
  const patients = [patient, ...getPatients()];
  savePatients(patients);
  return patient;
};

const readRecords = () => {
  if (typeof window === 'undefined') return [];
  return safeJsonParse(window.localStorage.getItem(RECORDS_KEY), []);
};

const saveRecords = (records) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
};

const getRecordsByPatientId = (patientId) => readRecords().filter((record) => record.patientId === patientId);

const addRecord = (record) => {
  const records = [record, ...readRecords()];
  saveRecords(records);
  return record;
};

const generateId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export { getPatients, getPatientById, addPatient, getRecordsByPatientId, addRecord, generateId };