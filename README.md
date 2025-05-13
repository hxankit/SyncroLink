# 📸 SyncroLink

**SyncroLink** is a modern full-stack social media platform where users can share photos, follow others, and chat in real-time. Built for smooth user interaction and fast performance, SyncroLink brings together the best of social sharing and instant messaging in one beautifully responsive web app.

---

## 🚀 Features

- 📷 **Photo Sharing** – Upload and explore photos shared by users.
- 🔐 **Secure Registration/Login** – OTP-based email verification keeps accounts safe.
- 👥 **Follow/Unfollow System** – Build your social circle and see others’ content.
- 💬 **Real-time Messaging** – Chat instantly with other users using WebSockets (Socket.IO).
- 📱 **Responsive Design** – Optimized UI for desktop, tablet, and mobile.
- 🔄 **Live Updates** – Real-time follower count and chat sync with Redux and sockets.

---

## 🛠 Tech Stack

### 🔹 Frontend
- **React JS** (with Vite)
- **Tailwind CSS** – Modern, utility-first styling
- **Redux Toolkit** – Global state management
- **React Router DOM** – Navigation and routing
- **Axios** – API communication
- **Socket.IO Client** – Real-time messaging

### 🔹 Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **Socket.IO Server** – Real-time messaging server
- **JWT** – Secure authentication
- **Nodemailer** – OTP email delivery
- **bcrypt.js** – Password hashing

---

## 📂 Folder Structure

syncrolink/ ├── client/ # React frontend ├── server/ # Express backend │ ├── controllers/ │ ├── models/ │ ├── routes/ │ ├── socket/ # Real-time messaging logic │ └── utils/ └── README.md

yaml
Copy
Edit

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/syncrolink.git
cd syncrolink
```
2. Frontend Setup
```bash
Copy
Edit
cd client
npm install
npm run dev
```
3. Backend Setup
```bash
cd server
npm install
npm run dev
```
MongoDB must be running locally or use a cloud database (e.g., MongoDB Atlas).

🔐 Environment Variables
Create a .env file inside the server/ directory:

env
```
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/syncrolink
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
CLIENT_URL=http://localhost:5173
```![index](https://github.com/user-attachments/assets/1c210398-71e0-4df7-af0d-8b59e0ac228d)

💬 Real-time Messaging (Socket.IO)
The backend initializes a WebSocket server using Socket.IO.

Frontend connects to it via socket.io-client.

Events supported:

sendMessage – user sends a message

receiveMessage – receiving messages in real-time

userConnected / userDisconnected for presence

Messages are stored in MongoDB for persistence.

🖼 Screenshots
Coming soon...
