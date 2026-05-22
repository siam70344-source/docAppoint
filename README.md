# DocAppoint — Doctor Appointment Booking Platform

DocAppoint is a modern Single-Page Application (SPA) designed to help patients discover medical specialists, read patient feedback, and instantly schedule or manage clinical appointments online.

**Live Client URL:** [https://docappoint.vercel.app](https://docappoint.vercel.app)  
**Server API Endpoint:** [https://docappoint-server.onrender.com](https://docappoint-server.onrender.com) *(Replace with your actual Render URL if different)*

---

## Core Application Features

* **Secure Authentication & Session Persistence:** Integrated Firebase Google Social Login combined with JSON Web Tokens (JWT) stored securely via HTTP-only cookies. Authentication state persists smoothly, ensuring private dashboard routes do not redirect to login upon a hard browser reload.
* **Dynamic Doctor Directory & Real-time Search:** A dedicated directory interface featuring advanced specialization filtering and an instant string-matching input field that queries specific doctor profiles from MongoDB without refreshing the page.
* **Complete Booking Management (CRUD):** Authentic dashboard workflow allowing authenticated users to book appointments via interactive modal overlays, update patient data dynamically, and securely cancel/delete entry instances.
* **Theme-Compliant Responsive UI:** A responsive mobile-first grid layout crafted with standard Tailwind CSS utilities, fluid mobile dropdown sheets, matching primary dark green branding transitions (`#00a76f`), and robust fallback initials avatars handling broken image URLs gracefully.
* **Polished Application User Experience:** Features custom pure Tailwind CSS loading spinner indicators during asynchronous data fetches, context-aware metadata management across individual pages via React Helmet, and structured user toast notifications utilizing React Hot Toast.

---

## Key Tech Stack & Libraries

### Frontend
* **Core:** React (Vite), React Router DOM (Single Page Application Routing)
* **Authentication:** Firebase (Google Auth)
* **UI & Animation:** Tailwind CSS, React Icons
* **Utilities:** React Helmet Async (SEO management), React Hot Toast (Status popups)

### Backend
* **Core:** Node.js, Express.js
* **Database Object Modeling:** Mongoose, MongoDB Atlas
* **Security:** JSON Web Tokens (JWT), Cookie Parser, CORS, Dotenv

---

## Local Development Setup

Follow these quick guidelines to configure and launch the system inside a local development workspace:

### 1. Backend Server Installation
1. Navigate to the server folder root.
2. Initialize dependencies:
   ```bash
   npm install