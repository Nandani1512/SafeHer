# SafeHer 🛡️

**SafeHer** is a comprehensive personal safety and community empowerment platform dedicated to providing real-time assistance, critical resources, and a supportive network for women. Designed with speed and reliability in mind, SafeHer offers a suite of tools ranging from real-time SOS broadcasting to interactive safety maps.

## 🌟 Key Features

*   🚨 **Real-Time SOS Broadcasting:** Instantly alert contacts and broadcast your live geolocation during emergencies using WebSocket technology.
*   🗺️ **Interactive Safety Map:** Navigate safely with real-time incident reports, safe zone indicators, and location sharing.
*   📞 **Helpline Directory:** Direct and immediate access to critical emergency services, domestic abuse hotlines, and counseling services.
*   💬 **Community Forum:** A secure and supportive space for users to share experiences, ask for advice, and connect with others.
*   🔐 **User Authentication:** Secure sign-up and login powered by Firebase Authentication.
*   📊 **Personal Dashboard:** Manage your emergency contacts, view your trusted network, and customize your safety preferences.

## 🛠️ Technology Stack

**Frontend**
*   [React 19](https://react.dev/) - UI Library
*   [Vite](https://vitejs.dev/) - Frontend Tooling
*   [React Router](https://reactrouter.com/) - Navigation
*   [Firebase](https://firebase.google.com/) - Authentication
*   [Socket.io-client](https://socket.io/) - Real-time communication

**Backend**
*   [Node.js](https://nodejs.org/) & [Express 5](https://expressjs.com/) - Server Framework
*   [Socket.io](https://socket.io/) - WebSockets for real-time SOS alerts
*   [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) - Database and ODM

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn
*   MongoDB instance (local or Atlas)
*   Firebase Project (for Authentication)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/SafeHer.git
cd SafeHer
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file and add your environment variables
cp .env.example .env

# Start the development server (runs on port 5005 by default)
npm run dev
```

*Ensure your `.env` file contains your MongoDB connection string and any other required backend secrets.*

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

*Ensure your Firebase configuration is properly set up in `frontend/src/services/firebase.js`.*

## 📂 Project Structure

```
SafeHer/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/        # Express API routes
│   │   └── services/      # Business logic & Socket service
│   ├── server.js          # Express server entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── assets/        # Images, icons, etc.
    │   ├── components/    # Reusable UI components (Navbar, SOSButton, etc.)
    │   ├── pages/         # Route views (Home, Dashboard, Map, etc.)
    │   ├── services/      # Firebase and API services
    │   ├── App.jsx        # Main React component
    │   └── main.jsx       # React DOM entry point
    └── package.json
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
