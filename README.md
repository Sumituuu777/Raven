# 🐦 Raven

Raven is a full-stack social platform that combines **real-time messaging** with an **integrated blogging system**. Users can chat instantly, publish blogs, engage with posts through likes and comments, and manage their profiles—all within a modern, responsive web application.

**🌐 Live Demo:** https://raven-lyart.vercel.app

---

## ✨ Features

### 💬 Chat

- 🔐 JWT Authentication
- 💬 Real-time Messaging
- 🟢 Online/Offline Status
- 🔍 Search Users
- 📱 Responsive Chat Interface
- ⚡ Socket.IO Powered Communication

### ✍️ Blogging

- 📝 Create Blogs
- ✏️ Edit Your Blogs
- 🗑️ Delete Blogs
- ❤️ Like & Unlike Blogs
- 💬 Comment on Blogs
- 📊 Comment Count & Like Count
- 📖 Browse Community Posts

### 👤 User

- 👤 User Profiles
- 🖼️ Profile Picture Upload (Cloudinary)
- 🔒 Secure JWT Authentication

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Socket.IO Client
- React Router
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication
- bcryptjs
- Cloudinary
- Multer

---

## 📁 Project Structure

```
Raven/
│
├── frontend/        # React Frontend
└── backend/        # Express Backend
```

---

# 🚀 Running Raven Locally

## 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/Raven.git

cd Raven
```

---

## 2. Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

---

## 3. Backend Environment Variables

Create a `.env` file inside the **backend** folder.

```env
DB_PASS=""

DB_USER=""

JWT_SECRET=""

CLOUDINARY_CLOUD_NAME=""

CLOUDINARY_API_KEY=""

CLOUDINARY_API_SECRET=""
```

---

## 4. Frontend Environment Variables

Create a `.env` file inside the **frontend** folder.

For local development:

```env
VITE_BACKEND_URL=http://localhost:3050
```

If you want to connect to the deployed backend:

```env
VITE_BACKEND_URL=https://{your render hosted link}.onrender.com
```

---

## 5. Start Backend

```bash
cd backend

npm start
```

Backend will run on

```
http://localhost:3050
```

---

## 6. Start Frontend

```bash
cd frontend

npm run dev
```

Frontend will run on

```
http://localhost:5173
```

---

## 🔒 Authentication

- Secure JWT Authentication
- Password hashing using bcryptjs
- Protected API Routes

---

## 📷 Image Storage

Profile pictures are securely stored using **Cloudinary**.
Blogs old images are deleted after updating blog or delete blog. 
---

## ⚡ Real-Time Communication

Raven uses **Socket.IO** for:

- Instant messaging
- Online user updates
- Live conversations without page refresh
- unseen messages count as notification bullet for specific user

---
## ✍️ Integrated Blogging Platform

Raven includes a complete blogging platform alongside its real-time chat functionality.

Users can:

- Create and publish blog posts
- Edit or delete their own blogs
- Like and unlike blogs
- Comment on posts
- Delete their own comment
- View the number of likes and comments
- Explore blogs shared by other users

---

## 🤝 Contributing

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 👨‍💻 Author

Developed by **Sumit Kumar**

If you like this project, consider giving it a ⭐ on GitHub.
