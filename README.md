---

```markdown
# 🖨️ CyberQueue — Smart Printing Queue Management System

CyberQueue is a real-time smart printing queue system designed to manage printing tasks efficiently in high-demand environments like colleges, offices, and labs. Built using **React.js** for the frontend and **Firebase** for real-time database and authentication, this project also integrates with an **ESP32 microcontroller** to display live queue data on an **LCD display** at the print station.

The system supports **role-based access**, with dedicated user and admin dashboards, and includes advanced features like **estimated waiting time**, **queue history**, and **notifications**.

---

## 🚀 Features

- 🔐 **Authentication** — Secure login for users via Firebase Auth.
- 👥 **Role-Based Access** — Separate dashboards and controls for users (`/main-app`) and admins (`/admin-dashboard`).
- 🧾 **Queue Management** — Add, view, and manage real-time print job status.
- ⏱️ **Estimated Wait Time** — Each user sees their personalized wait time based on queue position.
- 🕓 **Queue History** — Tracks previously completed jobs with time-stamped entries.
- 🔔 **Notifications** — Real-time alerts for users when it's their turn or when a job is completed.
- 🔄 **Real-Time Sync** — Instantly reflects changes across all clients using Firebase Realtime Database.
- 📟 **ESP32 Integration** — Queue number displayed on a physical LCD via ESP32 microcontroller.
- 🔍 **Responsive UI** — Optimized for mobile and desktop using Tailwind CSS.

---

## 🛠️ Tech Stack

| Category       | Technologies Used |
|----------------|-------------------|
| Frontend       | React.js, Tailwind CSS |
| Backend        | Firebase (Auth, Realtime Database, Cloud Functions) |
| Hardware       | ESP32 with LCD Display |
| Package Manager| npm               |

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/cyberqueue.git
cd cyberqueue
````

### 2. Install Dependencies

For each app:

```bash
cd main-app
npm install

cd ../admin-dashboard
npm install
```

### 3. Setup Firebase

* Go to [Firebase Console](https://console.firebase.google.com/)
* Create a new project
* Enable **Email/Password Authentication**
* Create a **Realtime Database**
* Get your Firebase config and paste it inside both:

```js
// main-app/src/services/firebaseConfig.js
// admin-dashboard/src/services/firebaseConfig.js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

### 4. Run the Apps

In separate terminals:

```bash
cd main-app
npm run dev

cd ../admin-dashboard
npm run dev
```

Visit:

* User App: `http://localhost:5173`
* Admin Dashboard: `http://localhost:5174` *(or whichever port is assigned)*

---

## 📡 ESP32 & LCD Integration

The ESP32 is programmed using Arduino IDE to:

* Connect to Firebase via WiFi
* Fetch the current queue number from Firebase
* Display the number on a 16x2 LCD in real time
* 
---

## ✨ Completed Features

* ✅ Role-based login with user/admin separation
* ✅ Queue tracking with real-time database updates
* ✅ Estimated waiting time per job
* ✅ Queue history logs
* ✅ Notifications (real-time alerts for job status)
* ✅ Firebase integration for full-stack sync
* ✅ ESP32 display functionality

---

## 📌 Future Scope

* Deploy on Firebase Hosting or Vercel
* Implement QR code-based job check-in
* Voice announcement using ESP32 with speaker module

---

## 🤝 Contributions

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License

[MIT](https://choosealicense.com/licenses/mit/)

---
