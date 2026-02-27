# 📱 Social Media Feed Application (MERN Stack)

A simplified Social Media Feed Application built using the MERN stack.
This project demonstrates user authentication and interactive feed functionality such as posts, likes, and comments.


---

🚀 Features

👤 User Features

User Registration

User Login (JWT-based Authentication)

Create Posts

View All Posts

Like Posts

Comment on Posts


🔁 Optional Feature

Real-time updates using WebSockets (can be implemented using Socket.io)



---

🛠️ Tech Stack

Frontend

React.js

Axios

CSS


Backend

Node.js

Express.js

MongoDB

Mongoose

bcryptjs (Password Encryption)

JSON Web Token (JWT)

CORS


Optional:

Socket.io (for real-time updates)



---

📁 Project Structure

All functionality is implemented using three main files:

MainPage.js      → React frontend (UI + API calls)
MainPage.css     → Styling
server.js        → Backend (Auth + Posts + Likes + Comments)

Database used:

MongoDB (socialMediaDB)


---

⚙️ Installation & Setup

1️⃣ Initialize Backend

npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors

Optional (for real-time updates):

npm install socket.io


---

2️⃣ Install Frontend Dependency

npm install axios


---

3️⃣ Start MongoDB

Ensure MongoDB is running locally:

mongodb://127.0.0.1:27017/socialMediaDB


---

4️⃣ Run Backend Server

node server.js

Server runs at:

http://localhost:5000


---

5️⃣ Run React Application

Ensure MainPage.js is imported inside App.js.

npm start

Frontend runs at:

http://localhost:3000


---

🔐 Authentication System

Passwords are encrypted using bcrypt.

JWT token is generated during login.

Token must be sent in headers for protected routes.

Only authenticated users can create posts, like, or comment.



---

📡 API Endpoints Overview

Authentication

POST /register

POST /login


Posts

POST /post → Create Post

GET /posts → Get All Posts

PUT /like/:id → Like Post

POST /comment/:id → Add Comment



---

🗄️ Database Models

User Model

name

email

password


Post Model

userId

content

likes (number)

comments (array)

createdAt



---

🔄 Application Workflow

1. User registers or logs in.


2. User creates a post.


3. All users can view posts.


4. Users can like posts.


5. Users can add comments.


6. (Optional) Posts update in real-time using WebSockets.




---

🎯 Learning Outcomes

Implementing JWT-based authentication

Creating relational logic in MongoDB

Building social feed features

Handling likes and comments

Understanding real-time updates using WebSockets

Full-stack MERN development



---
