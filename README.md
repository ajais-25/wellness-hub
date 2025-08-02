# Wellness Hub 🧘‍♀️

A full-stack wellness session management platform built with React and Node.js. Create, share, and discover mindfulness practices and guided wellness experiences.

## 🚀 Live Demo: [https://wellness-hub-phi.vercel.app](https://wellness-hub-phi.vercel.app)

_Note: Hosted on free tier - servers may take 30-60 seconds to start up on first request._

## ✨ Features

- 🔐 **User Authentication** - Secure registration and login with JWT
- 📝 **Session Management** - Create, edit, and publish wellness sessions
- 📄 **Draft System** - Save work as drafts before publishing
- 🏷️ **Tagging System** - Organize sessions with custom tags
- 🔍 **Search & Filter** - Find sessions by title, tags, or status
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI** - Clean interface built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- **React 19.1** - UI framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client
- **Vite** - Build tool and dev server

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ajais-25/wellness-hub.git
cd wellness-hub
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure environment variables in `backend/.env`:**

```env
PORT=3000
MONGO_URI=YOUR_MONGO_URI_HERE
CORS_ORIGIN=http://localhost:5173

JWT_SECRET=YOUR_JWT_SECRET_HERE
JWT_EXPIRES_IN=7d
```

**Start the backend server:**

```bash
# Development mode
npm run dev
```

The backend server will run on `http://localhost:3000`

### 3. Frontend Setup

Open a new terminal and navigate to frontend:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Database Setup

Make sure MongoDB is running locally, or update the `MONGODB_URI` in your `.env` file to point to your MongoDB Atlas cluster.

## 🔌 API Documentation

### Base URL

- Development: `http://localhost:3000/api/v1`
- Production: `https://wellness-hub-backend.onrender.com/api/v1`

### Authentication Endpoints

#### Register User

```http
POST /users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Login User

```http
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token"
  }
}
```

#### Get Current User

```http
GET /users/me
Authorization: Bearer <token>
```

#### Logout User

```http
POST /users/logout
Authorization: Bearer <token>
```

### Session Endpoints

#### Get All Published Sessions

```http
GET /sessions
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "session_id",
      "user_id": "user_id",
      "title": "Morning Meditation",
      "tags": ["meditation", "morning", "mindfulness"],
      "json_file_url": "https://example.com/session.json",
      "status": "published",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get User's Sessions

```http
GET /my-sessions
Authorization: Bearer <token>
```

#### Get Session by ID

```http
GET /my-sessions/:id
Authorization: Bearer <token>
```

#### Save Draft Session

```http
POST /my-sessions/save-draft
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Evening Relaxation",
  "tags": ["relaxation", "evening"],
  "json_file_url": "https://example.com/session.json",
  "sessionId": "session_id" // Optional, for updating existing draft
}
```

#### Publish Session

```http
POST /my-sessions/publish
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Morning Meditation",
  "tags": ["meditation", "morning"],
  "json_file_url": "https://example.com/session.json",
  "sessionId": "session_id" // Optional, for updating existing session
}
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## 🌟 Usage

1. **Register/Login** - Create an account or use the demo credentials
2. **Dashboard** - Browse published wellness sessions from the community
3. **Create Sessions** - Use the Session Editor to create new wellness content
4. **Manage Content** - View and edit your sessions in "My Sessions"
5. **Draft System** - Save work as drafts before publishing to the community

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Made with ❤️ for wellness and mindfulness
