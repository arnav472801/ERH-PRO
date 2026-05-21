import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">Welcome to ERH PRO</h2>
        <p className="text-slate-500 mt-2">Manage patient records and medical data efficiently.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-100 text-center">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Get Started</h3>
        <p className="text-slate-600 mb-6">Start by adding patient records to your system.</p>
        <Link 
          to="/patients/new" 
          className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-md"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Add First Patient
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Patient Records</h3>
          <p className="text-slate-600">View all patient records and their medical history in the Patients section.</p>
          <Link to="/patients" className="mt-4 inline-block text-primary hover:underline font-medium">Go to Patients →</Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Medical Records</h3>
          <p className="text-slate-600">Add and manage medical records for each patient including diagnoses and medications.</p>
          <Link to="/patients" className="mt-4 inline-block text-primary hover:underline font-medium">View Records →</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
