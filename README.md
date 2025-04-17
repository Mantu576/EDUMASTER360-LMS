# 🎓 Edumaster360 - Learning  Management System

A comprehensive MERN-based Learning Management System designed to streamline administrative, academic, and communication tasks within an educational institution. Built with role-based access for **Admin**, **Teachers**, and **Students**, the platform offers powerful tools to manage assignments, notes, attendance, student performance, and more.



## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Folder Structure](#-folder-structure)
- [Screenshots](#-screenshots)


---

## 🚀 Features

### 🔑 Authentication & Roles
- Secure login with role-based access.
- Three roles: **Admin**, **Teacher**, and **Student**.
- Guest login option for demonstration.

### 👩‍🏫 Teacher Functionalities
- Upload and manage **assignments** and **notes** (text/files).
- Track student **attendance** and **marks**.
- View submissions.

### 👨‍🎓 Student Functionalities
- View assigned **notes** and **assignments**.
- Upload **assignment answers** (PDFs/docs/images).
- Check attendance and grades.

### 🧑‍💼 Admin Functionalities
- Manage users (teachers/students).
- View reports and dashboards.
- Monitor assignment and attendance records.

### 📄 Others
- Responsive and user-friendly interface.
- Real-time error handling and loading indicators.
- Popup messages for network issues.
- Flowing marquee welcome banner on the homepage.

---

## 🧰 Tech Stack

### 🖥 Frontend
- React.js
- Redux
- React Router
- Material UI (MUI)
- Styled Components

### 🛠 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (for file upload)

### Tools & Platforms
- Git & GitHub
- VS Code
- Postman (for API testing)

---

## 🛠 Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/edumaster360.git
cd edumaster360
```
2. **Install dependencies for frontend and backend**
```
 cd client
npm install
cd ../server
npm install
```
3. **Set environment variables Create a .env file in the server folder and add:**
 ```
   PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```
4. Start both frontend and backend
```
# In /server
npm start

# In /client (in a new terminal)
npm start
```
## 📁 Folder Structure ##
```
/client            → Frontend (React.js)
/server            → Backend (Node.js/Express/MongoDB)
/uploads           → Stores uploaded assignment/notes files
```

## 📸 Screenshots ##

![Screenshot 2024-11-09 212841](https://github.com/user-attachments/assets/5af338b4-be15-45a4-a31a-d7f0ad2a73a4)
![Screenshot 2024-11-09 213324](https://github.com/user-attachments/assets/ec877e45-126e-4d36-8d97-dd37778471ec)
![Screenshot 2024-11-06 211133](https://github.com/user-attachments/assets/e3873a42-6775-4b0a-98c6-e9c09d7d0a85)
![Screenshot 2024-11-09 213020](https://github.com/user-attachments/assets/644c6764-a5fe-4080-81b2-b86b26c26fd4)
![Screenshot 2024-11-06 211200](https://github.com/user-attachments/assets/119b5d90-b118-460b-aaf5-cd624fd1cebc)
![Screenshot 2024-11-09 213431](https://github.com/user-attachments/assets/3fa8fe95-598b-42d9-86c3-1a417c43116c)









