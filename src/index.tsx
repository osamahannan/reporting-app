import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ReportDashboard from './ReportDashboard';
import { ModuleMetadata } from './shared-types';

const registerModule = () => {
  const metadata: ModuleMetadata = {
    name: 'reporting',
    url: window.location.origin + '/remoteEntry.js',
    components: ['ReportDashboard'],
    routes: ['/reporting/dashboard'],
    permissions: ['admin'],
  };
  window.dispatchEvent(new CustomEvent('moduleRegister', { detail: metadata }));
  console.log('Dispatched moduleRegister for reporting-app:', metadata);
};

registerModule();

const container = document.getElementById('root');
if (container) {
  console.log('Rendering reporting-app routes');
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/reporting/dashboard" />} />
        <Route path="/reporting/dashboard" element={<ReportDashboard />} />
      </Routes>
    </BrowserRouter>
  );
} else {
  console.error('Root container not found');
}