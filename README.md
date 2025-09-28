Reporting App
The Reporting App is a micro-frontend in a Webpack Module Federation architecture, providing an analytics dashboard with charts using Recharts, React, and TypeScript.
Repository

GitHub: https://github.com/osamahannan/reporting-app

Features

Analytics Dashboard: Exposes ReportDashboard component with data visualizations using Recharts.
Self-Registration: Registers with the host via the moduleRegister event, providing metadata for the /reporting/dashboard route, restricted to admin.
Role-Based Access: Route requires admin permissions.
Netlify Deployment: Independently deployed with CORS headers for remoteEntry.js.

Setup

Clone the Repository:git clone https://github.com/osamahannan/reporting-app.git
cd reporting-app


Install Dependencies:npm install
npm install recharts @types/recharts


Run Locally:npm start


Opens at http://localhost:3003.
Test standalone route: http://localhost:3003/reporting/dashboard.


Build for Production:npm run build


Outputs to dist/.


Deploy to Netlify:npm run deploy


Deploys to https://micro-reporting.netlify.app.



Architecture Decisions

Webpack Module Federation: Exposes ReportDashboard via remoteEntry.js for host integration.
TypeScript: Ensures type safety for components, Recharts props, and ModuleMetadata interface.
React with react-router-dom: Supports standalone routing for testing (/reporting/dashboard).
Recharts: Chosen for lightweight, customizable data visualizations in ReportDashboard.tsx.
SPA Routing: Configured historyApiFallback and netlify.toml for consistent SPA behavior.
Role-Based Access: Route restricted to admin, enforced by the host’s routing logic.

Communication Design

Self-Registration: Dispatches moduleRegister event in index.tsx with metadata (name: reporting, routes, components, permissions: ['admin'], URL).
Shared Dependencies: Shares react, react-dom, react-router-dom as singletons with the host. Recharts is local to avoid conflicts.
CORS: netlify.toml sets Access-Control-Allow-Origin: * for remoteEntry.js access.
No Direct Events: Relies on host’s userRole state for access control, updated via auth-app events.

Testing

Local: Run npm start and test http://localhost:3003/reporting/dashboard. Verify charts render and route loads in the host (http://localhost:3000/reporting/dashboard) with admin role.
Production: Test at https://micro-reporting.netlify.app/reporting/dashboard and in the host at https://micro-host-app.netlify.app/reporting/dashboard.
Self-Registration: Check console for Dispatched moduleRegister for reporting-app log.
