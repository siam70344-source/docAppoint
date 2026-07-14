# 🏥 DocAppoint

**DocAppoint** is a doctor appointment booking platform that allows patients to browse available doctors and schedule appointments online with ease.

🔗 **Live Site:** [doc-appoint-opal.vercel.app](https://doc-appoint-opal.vercel.app/appointments)
🔗 **Repository:** [docAppoint](https://github.com/SafayatCode/docAppoint.git)

<!-- ![DocAppoint Screenshot](./screenshot.png) -->
> 📸 *Add a screenshot of the homepage here (screenshot.png) once available.*

---

## ✨ Key Features

- 👨‍⚕️ **Browse Doctors** — View a list of available doctors with their specialties
- 📅 **Book Appointments** — Schedule an appointment with a chosen doctor at an available time slot
- 🔐 **User Authentication** — Secure login/register using Firebase Auth (client) with JWT-based sessions (server)
- 📋 **Appointment Management** — View and manage upcoming appointments
- 🎬 **Smooth Animations** — Enhanced UI experience with Framer Motion
- 🔔 **Toast Notifications** — Real-time feedback for user actions
- 🖼️ **Carousel/Sliders** — Interactive content sliders using Swiper
- 📱 **Responsive Design** — Works smoothly across mobile, tablet, and desktop

---

## 🛠️ Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS, Framer Motion, React Router
**Backend:** Node.js, Express.js
**Database:** MongoDB (Mongoose)
**Authentication:** Firebase Auth (client) + JWT (jsonwebtoken) with cookie-based sessions (server)

---

## 📦 Dependencies

**Frontend (`docappoint-client`)**

```json
"axios": "^1.16.1",
"firebase": "^12.13.0",
"framer-motion": "^12.40.0",
"react": "^19.2.6",
"react-dom": "^19.2.6",
"react-helmet-async": "^3.0.0",
"react-hot-toast": "^2.6.0",
"react-icons": "^5.6.0",
"react-router-dom": "^7.15.1",
"swiper": "^12.1.4"
```

Dev dependencies: Vite, Tailwind CSS, ESLint, PostCSS, Autoprefixer

**Backend (`docappoint-server`)**

```json
"cookie-parser": "^1.4.7",
"cors": "^2.8.5",
"dotenv": "^16.0.0",
"express": "^4.18.0",
"jsonwebtoken": "^9.0.0",
"mongoose": "^7.0.0"
```

Dev dependency: `nodemon` (for auto-restarting the server during development)

---

## 🚀 Run Locally

**1. Clone the repositories**

```bash
git clone https://github.com/SafayatCode/docAppoint.git
git clone https://github.com/SafayatCode/docappoint-server.git
```

**2. Install dependencies**

```bash
cd docAppoint
npm install

cd ../docappoint-server
npm install
```

**3. Set up environment variables**

Create a `.env` file in the **server** folder with:

```
PORT=5000
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Create a `.env` file in the **client** folder with your Firebase config:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_API_URL=http://localhost:5000
```

**4. Run the server**

```bash
cd docappoint-server
npm run dev
```

**5. Run the client**

```bash
cd docAppoint
npm run dev
```

**6. Open in browser**

```
http://localhost:5173
```

---

## 🔗 Links

- 🌐 Live Site: [doc-appoint-opal.vercel.app](https://doc-appoint-opal.vercel.app/appointments)
- 💻 Repository: [docAppoint](https://github.com/SafayatCode/docAppoint.git)
