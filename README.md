# 🏋️‍♂️ **Workout Tracker**   

A simple web application that allows users to manage their workouts efficiently. Users can register, log in, and track their workout routines, including details like exercise name, reps, and weight.

### 🚀 **Features:**

- ✅ **User Authentication** (Register & Login using JWT)
- ✅ **Workout Management** (Create, Read, Update, Delete)
- ✅ **Responsive UI** (Built with Material-UI)
- ✅ **Secure API** (Protected routes using JWT)
- ✅ **Modern Tech Stack** (MERN - MongoDB, Express.js, React, Node.js)

---

## ⚙️ **Tech Stack:**

- **Frontend:** HTML5, CSS3, MUI, JavaScript, ReactJS
- **Backend:** NodeJS, ExpressJS
- **Database:** MongoDB
- **Authentication:** JWT
- **Version Control:** Git
- **Tools:** npm, Visual Studio Code

---

## 💻 **Installation and Setup:**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/glenvillethedev/mern-app.git
cd workout-tracker
```

### 2️⃣ Backend Setup

Create an .env file inside the /backend folder
```bash
PORT=local_port_number
MONGO_URI=your_mongodb_connection_string
SECRET=jwt_secret
```

Install dependencies & run backend
```bash
cd backend
npm install
npm run dev
```

Backend will run on given PORT inside the .env file.

### 3️⃣ Frontend Setup

Create an .env file inside the /frontend folder
```bash
PORT=local_port_number
REACT_APP_API_BASE_URL=url_for_backend
```

Install dependencies & run backend
```bash
cd backend
npm install
npm run dev
```

Frontend will run on given PORT inside the .env file.

---

## 📂 **Folder Structure:**

```
📁 workout-tracker
 ├── 📁 backend → api
     ├── 📁 controllers → api endpoints
     ├── 📁 middlewares → middleware functions
     ├── 📁 models → Mongoose models
     ├── 📁 routes → api routes
     ├── 📝 server.js → startup/entry file
 ├── 📁 frontend → ui
     ├── 📁 build → release files
     ├── 📁 public → static files
         ├── 📁 img → static images/logo
         ├── 📝 index.html
     ├── 📁 src → api endpoints
         ├── 📁 components → react components
         ├── 📁 contexts → global states
         ├── 📁 hooks → custom hooks
         ├── 📁 pages → react pages
         ├── 📝 App.js
         ├── 📝 index.js
```

---

## 🛠 **API Endpoints**

```
POST     /api/user/login  - login user
POST     /api/user/signup - register new user

GET      /api/workout	    - retrieve all workout
POST     /api/workout/:id - retrieve specfic workout
POST     /api/workout	    - create a new workout
PUT      /api/workout/:id	- update a workout
DELETE   /api/workout/:id	- delete a workout
```

---

## 🛡 **Authentication (JWT)**

- Users must log in to access the workout dashboard.
- JWT token is stored in localStorage and used for authentication in API requests.
  
---

## 🌐 **UI Preview (MUI)**

The app is built using Material-UI, providing a clean and modern design.

- 🔹 Login / Register Page
- 🔹 Workout Dashboard (List of Workouts with Edit & Delete options)
- 🔹 Add Workout Modal (MUI Modal)

---

## 💡 **Future Enhancements**

- 🎯 Import / Export workouts
- 🎯 Email Verification
- 🎯 Password Recovery
- 🎯 User Settings

---

## 📌 **Contact:**

- 🌐 GitHub: https://github.com/glenvillethedev
- 📧 Email: glenville.work@gmail.com
- 🛠️ LinkedIn: https://www.linkedin.com/in/glenville-maturan

