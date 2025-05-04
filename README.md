# ASHA-Sakhi API

The **ASHA-Sakhi API** serves as the backend for the ASHA-Sakhi mobile app. It provides RESTful endpoints for patient management, health checkups, government schemes, weekly diet plans, and automated appointment reminders. This backend is used primarily by ASHA workers to streamline healthcare data collection and delivery in rural areas.

---

## 🔧 Features

- 🧍 Save, edit, and fetch patient profiles
- 🩺 Record and track patient checkups
- 🗓️ Automated appointment reminders via scheduled cron jobs
- 🥗 Weekly diet suggestion system with caching
- 🏛️ Health scheme information automatically pushed to users

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **Postgres** via **sequelize**
- **JWT Authentication**
- **node-cron** for scheduled jobs
- **Axios** for external data fetching (diet, schemes)

---

## 🚀 Getting Started

### Prerequisites

- Node.js v20+
- Postgres
- npm or yarn

### Installation

```bash
git clone https://github.com/ii-pewpewpew-ii/asha-sakhi-api.git
cd asha-sakhi-api
npm install
