import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import VerifyAsset from './pages/VerifyAsset';
import Notification from './components/Notification';

const App: React.FC = () => {
  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-8">
        {notification && <Notification message={notification.message} type={notification.type} />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard account="0xYourEthereumAccount" contract={{}} setNotification={setNotification} />} />
          <Route path="/verify/:assetId" element={<VerifyAsset />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;