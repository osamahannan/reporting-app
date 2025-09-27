Reporting App (Micro-Frontend)
This repository contains the Reporting micro-frontend, exposing the ReportDashboard component.
Setup Instructions

Clone the repository:
git clone <repository-url>
cd reporting-app


Install dependencies:
npm install


Start the development server:
npm start

The app runs on http://localhost:3003.


Architecture Decisions

Module Federation: Exposes a single dashboard component.
Admin-Only: Restricted to 'admin' role in host's config.json.
Extensibility: Designed for adding charts (e.g., via recharts).

Communication Design

Uses host's user state for access control.
Minimal communication, focusing on display.

Demo Instructions

Local Demo:

Run npm start to start on http://localhost:3003.
Access via host (http://localhost:3000/reporting/dashboard) after logging in as admin.


Deployed Demo:

Deploy to Vercel: vercel --prod.
Update host's config.json with the deployed URL.
