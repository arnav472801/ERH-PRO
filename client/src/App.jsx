import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout/Layout';

import PatientsList from './pages/PatientsList';
import AddPatient from './pages/AddPatient';
import PatientProfile from './pages/PatientProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="patients/new" element={<AddPatient />} />
          <Route path="patients/:id" element={<PatientProfile />} />
          {/* Future routes will go here */}
          {/* <Route path="records" element={<Records />} /> */}
        </Route>
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
