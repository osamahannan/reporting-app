import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReportDashboard from './ReportDashboard';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Welcome to Reporting App</div>} />
        <Route path="/reporting/dashboard" element={<ReportDashboard />} />
      </Routes>
    </BrowserRouter>
  );
} else {
  console.error('Root container not found');
}