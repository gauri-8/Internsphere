# InternSphere 🚀

InternSphere is a full-stack web application designed to connect students with internship opportunities. It provides a platform for recruiters to post internships and for students to discover and apply to them seamlessly. 

The project is built with a modern web stack, featuring a React frontend and a Node.js/Express backend with MongoDB, utilizing Clerk for robust authentication.

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** React 19 + Vite
- **Routing:** React Router DOM
- **Authentication:** Clerk (`@clerk/clerk-react`)
- **API Calls:** Axios
- **Styling:** (Add your CSS framework here, e.g., Tailwind CSS, CSS Modules)

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication & Webhooks:** Clerk (`@clerk/clerk-sdk-node`, Svix)
- **File Uploads:** Multer (for resumes/profiles)
- **Security:** bcryptjs, jsonwebtoken, cors
- **Testing:** Jest

## ✨ Features

- **User Authentication:** Secure signup and login for both students and recruiters powered by Clerk.
- **Role-based Access:** Distinct dashboards and permissions for students and recruiters.
- **Internship Listings:** Recruiters can create, edit, and manage internship postings.
- **Application Tracking:** Students can apply to internships and track their application status.
- **File Uploads:** Support for uploading resumes and related documents.

## 📁 Project Structure

This repository is structured as a monorepo containing both the frontend and backend codebases.

```
internsphere/
├── client/          # React frontend application
│   ├── src/         # React components, pages, and context
│   ├── public/      # Static assets
│   └── package.json # Frontend dependencies
│
└── server/          # Node.js backend application
    ├── config/      # Database and external service configurations
    ├── controllers/ # Request handlers
    ├── models/      # Mongoose database schemas
    ├── routes/      # Express API routes
    ├── middleware/  # Custom Express middlewares
    ├── tests/       # Jest test suites
    ├── uploads/     # Local storage for file uploads
    ├── utils/       # Helper functions
    └── package.json # Backend dependencies
```

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)
- A [Clerk](https://clerk.com/) account for authentication keys

### 1. Clone the repository
```bash
git clone https://github.com/your-username/internsphere.git
cd internsphere
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
WEBHOOK_SECRET=your_svix_webhook_secret
# Add any other required environment variables
```

Start the backend development server:
```bash
npm run dev
```
The API will be available at `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory and add the following variable:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Start the frontend development server:
```bash
npm run dev
```
The application will run on `http://localhost:5173`.

## 🧪 Testing

The backend includes a Jest testing suite. To run the tests:
```bash
cd server
npm test
# Or to run with coverage report:
npm run test:coverage
```

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Gauri Borse**
