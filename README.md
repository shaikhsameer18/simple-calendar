# Simple Calendar Application

A full-stack calendar application where users can register, log in, and manage events seamlessly. Built with a Node.js backend and a React frontend, this app allows users to create, update, and delete events.

---

## Features

- User Authentication (Register/Login)
- Create, Update, Delete Events
- Interactive Calendar View
- Responsive Design

---

## Demo User Credentials

For testing the application, you can use the demo user credentials below:

- **Email**: `test@example.com`
- **Password**: `password123`

---

## Tech Stack

### Frontend:
- React.js
- Material-UI
- Axios
- React Big Calendar
- Lucide React Icons

### Backend:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- dotenv for environment configuration

---

## Installation

### Prerequisites:
- [Node.js](https://nodejs.org/) installed
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB instance

### Backend Setup:
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the `backend` folder with the following details:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup:
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure API URL:
   Open `frontend/src/config.js` or a similar configuration file and set the API URL:
   ```javascript
   export const API_URL = "http://localhost:5000";
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```


