# ERH PRO

ERH PRO is a modern patient management dashboard built with React, Tailwind CSS, Vite, and an Express.js backend. It helps you manage patient profiles, medical records, and administrative workflows with a clean UI.

## 🚀 Features

- Patient dashboard with quick actions
- Add new patients and view patient details
- Manage medical records for individual patients
- Express API backend with CORS and security headers
- Frontend built with React, React Router, and Tailwind CSS

## 📁 Project Structure

- `client/` — React frontend application
- `server/` — Express API server
- `package.json` — Root scripts for running both client and server together
- `.gitignore` — Ignored files

## ⚙️ Installation

```bash
npm install
npm install --prefix client
npm install --prefix server
```

## ▶️ Run Locally

Start both frontend and backend together from the project root:

```bash
npm run dev
```

Or start them separately:

```bash
npm run client
npm run server
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## 🧩 Backend API Endpoints

- `GET /api/patients` — List all patients
- `POST /api/patients` — Create a new patient
- `GET /api/patients/:id` — Get a patient by ID
- `PUT /api/patients/:id` — Update patient details
- `POST /api/records` — Add a medical record
- `GET /api/records/patient/:patientId` — Get records for a patient

## 💡 Notes

- The backend reads environment variables from `.env` if provided
- The frontend uses Vite and Tailwind CSS for fast development
- You can extend authentication and record management as needed

## 📌 Author
Prepared for the ERH PRO project.
