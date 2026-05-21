import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, FileText, User, Activity, Clock, Activity as ActivityIcon } from 'lucide-react';
import { getPatientById, getRecordsByPatientId, addRecord, generateId } from '../utils/patientStorage';

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddRecord, setShowAddRecord] = useState(false);
  
  // New Record Form State
  const [recordForm, setRecordForm] = useState({
    recordType: 'OPD Visit',
    diagnosis: '',
    visitNotes: '',
    medications: '',
  });

  useEffect(() => {
    const patientData = getPatientById(id);
    const recordData = getRecordsByPatientId(id);
    setPatient(patientData || null);
    setRecords(recordData);
    setLoading(false);
  }, [id]);

  const handleRecordSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      _id: generateId(),
      patientId: id,
      ...recordForm,
      createdAt: new Date().toISOString(),
      medications: recordForm.medications
        ? recordForm.medications.split(',').map((m) => ({ name: m.trim(), dosage: 'As prescribed', frequency: 'Daily', duration: '7 days' }))
        : [],
    };

    addRecord(payload);
    setRecords([payload, ...records]);
    setShowAddRecord(false);
    setRecordForm({ recordType: 'OPD Visit', diagnosis: '', visitNotes: '', medications: '' });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/patients')} className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Patient Profile</h2>
            <p className="text-sm text-slate-500">ID: {patient._id}</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAddRecord(!showAddRecord)}
          className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
        >
          {showAddRecord ? 'Cancel' : <><Plus className="h-4 w-4 mr-2" /> Add Record</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Patient Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{patient.name}</h3>
                <p className="text-slate-500 text-sm">{patient.gender}, {new Date().getFullYear() - new Date(patient.dob).getFullYear()} years</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Contact Details</p>
                <p className="text-sm font-medium text-slate-800">{patient.contact}</p>
                <p className="text-sm text-slate-600">Emergency: {patient.emergencyContact || 'None'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">Medical Info</p>
                <p className="text-sm text-slate-800">Blood Group: <span className="font-medium text-red-500">{patient.bloodGroup || 'Unknown'}</span></p>
                <div className="mt-1">
                  <p className="text-sm text-slate-600">Allergies:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {patient.allergies?.length > 0 ? patient.allergies.map((a, i) => (
                      <span key={i} className="px-2 py-0.5 bg-orange-100 text-orange-800 text-xs rounded-full">{a}</span>
                    )) : <span className="text-sm text-slate-500">None reported</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Records Timeline & Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Add Record Form */}
          {showAddRecord && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 animate-in slide-in-from-top-4 fade-in duration-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <ActivityIcon className="h-5 w-5 mr-2 text-primary" />
                New Medical Record
              </h3>
              <form onSubmit={handleRecordSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Record Type</label>
                    <select
                      value={recordForm.recordType}
                      onChange={(e) => setRecordForm({...recordForm, recordType: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                    >
                      <option>OPD Visit</option>
                      <option>Prescription</option>
                      <option>Diagnosis</option>
                      <option>Lab Result</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Primary Diagnosis</label>
                    <input
                      type="text"
                      required
                      value={recordForm.diagnosis}
                      onChange={(e) => setRecordForm({...recordForm, diagnosis: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      placeholder="e.g. Viral Fever"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Clinical Notes</label>
                  <textarea
                    rows={3}
                    value={recordForm.visitNotes}
                    onChange={(e) => setRecordForm({...recordForm, visitNotes: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                    placeholder="Patient presented with..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Medications Prescribed</label>
                  <input
                    type="text"
                    value={recordForm.medications}
                    onChange={(e) => setRecordForm({...recordForm, medications: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                    placeholder="Paracetamol 500mg, Amoxicillin (comma separated)"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
                    Save Record
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-slate-400" />
              Medical History
            </h3>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {records.length > 0 ? records.map((record) => (
                <div key={record._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-[.is-active]:bg-primary text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-slate-900">{record.recordType}</div>
                      <time className="text-xs font-medium text-slate-500">
                        {new Date(record.createdAt).toLocaleDateString()}
                      </time>
                    </div>
                    <div className="text-sm font-medium text-primary mb-2">Diagnosis: {record.diagnosis}</div>
                    <div className="text-slate-600 text-sm mb-3">
                      {record.visitNotes}
                    </div>
                    {record.medications?.length > 0 && (
                      <div className="mt-2 bg-slate-50 p-2 rounded text-xs border border-slate-100">
                        <span className="font-semibold text-slate-700 block mb-1">Rx:</span>
                        <ul className="list-disc pl-4 text-slate-600">
                          {record.medications.map((med, idx) => (
                            <li key={idx}>{med.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-slate-500">
                  No medical records found for this patient.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
