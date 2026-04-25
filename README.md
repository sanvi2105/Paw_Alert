
# 🐾 PawAlert – AI-Based Animal Rescue Platform

PawAlert is a full-stack web application designed to help people report injured street dogs and enable faster rescue response using AI and location tracking.

---

## 🚀 Features

* 📸 Upload images of injured dogs
* 🤖 AI-based dog detection using YOLOv8
* 📍 Automatic location detection (Geolocation API)
* 🗺️ Interactive map with case markers
* 📊 Real-time feed of reported cases
* 🚨 Urgency tagging (Low / Medium / High)
* 🔄 Status updates (Not Helped / In Progress / Helped)
* 🧩 NGO workflow simulation

---

## 🧠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router
* Leaflet (Maps)

### Backend

* FastAPI
* Python

### Database

* MongoDB

### Machine Learning

* YOLOv8 (Ultralytics)

---

## 🏗️ System Architecture

```
User → React Frontend → FastAPI Backend → MongoDB
                         ↓
                  YOLOv8 Model
```

---

## 📂 Project Structure

```
backend/
│
├── main.py
├── utils/
│   └── predict.py
├── uploads/        (ignored)
├── model/          (ML related code)
└── .env

frontend/
│
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Report.jsx
│   │   ├── Feed.jsx
│   │   └── Map.jsx
│   ├── components/
│   └── assets/
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```
git clone https://github.com/your-username/pawalert.git
cd pawalert
```

---

### 2. Backend Setup

```
cd backend
pip install -r requirements.txt
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
```

Run backend:

```
uvicorn main:app --reload
```

---

### 3. Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

### POST `/report`

* Submit new report
* Accepts image + details

---

### GET `/reports`

* Fetch all reports

---

### PUT `/update-status`

* Update case status

---

## 🧪 Machine Learning

* Model: YOLOv8 (pre-trained)
* Purpose: Detect presence of a dog in uploaded image
* Output: Object detection with confidence score

---

## 🎯 Design Decisions

* ❌ No authentication
  → Ensures fast reporting in emergency situations

* 🤖 Pre-trained model used
  → Due to lack of dataset and time constraints

* 📍 Geolocation used
  → Users don’t need to manually enter coordinates

---

## 🚧 Challenges Faced

* No dataset for injured vs normal dogs
* Initial ML model failures
* Image path and static file handling
* Map marker overlap issues

---

## 🔮 Future Improvements

* Authentication (NGO login)
* Severity detection model
* Real-time notifications
* Map clustering
* Deployment (Render + Vercel)


---

## 🙌 Author

**Sanvi Sagar**

---

## ⭐ Final Note

This project demonstrates:

* Full-stack development
* Machine learning integration
* Real-world problem solving
* Product thinking

---
