# Travel & Tourism Management System (MERN)

This is a simple Travel & Tourism Management System created using the MERN stack (MongoDB, Express, React, Node.js).
The project contains two main parts:

- backend → APIs, routes, controllers, database models
- frontend → React UI for users and agencies

This system allows users to browse packages, make bookings, and agencies to manage packages and dashboard.

------------------------------------------------------------

⭐ Features
- User Signup & Login
- Agency Login & Dashboard
- View Travel Packages (title, price, days, location, images)
- Booking creation
- Secure REST API with Express & MongoDB
- Simple React Frontend

------------------------------------------------------------

📁 Project Structure
backend/
  controllers/
  middleware/
  models/
  routes/
  server.js
  package.json

frontend/
  public/
  src/
    Agency.js
    AgencyDashboard.js
    Login.js
    Signup.js
    Home.js
    other component files...
  package.json

------------------------------------------------------------

⚙ Requirements
- Node.js
- npm
- MongoDB (local or Atlas)

------------------------------------------------------------

🔧 How to Run the Project

1. Clone the Repository
git clone <your-repo-url>
cd your-folder

2. Setup Backend
cd backend
npm install

Create a file named .env inside backend with:
MONGO_URI=your_mongodb_url
PORT=5000
JWT_SECRET=anythingsecret

Start backend:
npm run dev

3. Setup Frontend
cd frontend
npm install
npm start

Frontend runs at: http://localhost:3000
Backend runs at: http://localhost:5000

------------------------------------------------------------

🛣 API Routes (Examples)

Users
POST /api/users/signup
POST /api/users/login

Agencies
GET /api/agencies
GET /api/agencies/:id

Bookings
POST /api/bookings/create

------------------------------------------------------------

🧪 Tech Stack
- MongoDB
- Express.js
- React.js
- Node.js
- Mongoose

------------------------------------------------------------

👨‍💻 Contributors                                                                                                                                                                                                                                                 - JayaSankar M
- Charan B
- Sneha M
- Jaya Sankar M
------------------------------------------------------------

📜 License
This project is developed for academic and learning purposes.
