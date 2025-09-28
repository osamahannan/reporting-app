import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ReportDashboard from './ReportDashboard';

const container = document.getElementById('root');
if (container) {
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