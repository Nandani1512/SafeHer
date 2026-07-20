# SafeHer 🛡️

**SafeHer** is a comprehensive personal safety and community empowerment platform dedicated to providing real-time assistance, critical resources, and a supportive network for women. Designed with speed and reliability in mind, SafeHer offers a suite of tools ranging from an AI-powered helpline to interactive safety maps, all wrapped in a premium, modern glassmorphic UI.

## 🌟 Key Features

*   🚨 **Real-Time SOS Broadcasting:** Instantly alert contacts and broadcast your live geolocation during emergencies using WebSocket technology.
*   🗺️ **Interactive Safety Map:** Navigate safely with real-time OpenStreetMap integration via Leaflet, featuring safe zone indicators and location sharing.
*   🤖 **AI Chatbot Assistant:** Get instant, empathetic safety advice and routing through an intelligent chatbot powered by Google's Gemini AI.
*   📞 **Helpline Directory:** Direct and immediate access to critical emergency services, domestic abuse hotlines, and counseling services.
*   💬 **Community Forum:** A secure and supportive space (backed by MongoDB) for users to share experiences, ask for advice, and connect with others.
*   🔐 **User Authentication:** Secure sign-up, login, and Google OAuth powered by Firebase Authentication.
*   📊 **Premium Bento-Box Dashboard:** Manage your emergency contacts and view your trusted network through a state-of-the-art glassmorphic UI.

## 🛠️ Technology Stack

**Frontend**
*   [React 19](https://react.dev/) - UI Library
*   [Vite](https://vitejs.dev/) - Frontend Tooling
*   [React Router](https://reactrouter.com/) - Navigation
*   [Firebase](https://firebase.google.com/) - Authentication
*   [Leaflet / React-Leaflet](https://react-leaflet.js.org/) - Interactive Maps
*   [Vanilla CSS] - Custom Glassmorphic Styling

**Backend**
*   [Node.js](https://nodejs.org/) & [Express 5](https://expressjs.com/) - Server Framework
*   [Google Gemini API](https://aistudio.google.com/) - AI Chatbot Engine
*   [MongoDB Atlas](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) - Cloud Database and ODM

## 🚀 Live Deployment

This project is configured for cloud deployment:
- **Frontend**: Hosted on [Vercel](https://vercel.com/) (using `vercel.json` for SPA routing)
- **Backend**: Hosted on [Render](https://render.com/) as a Web Service
- **Database**: Hosted on [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)

## 💻 Local Development Setup

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or higher)
*   MongoDB instance (local or Atlas)
*   Firebase Project (for Authentication)
*   Google Gemini API Key

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/SafeHer.git
cd SafeHer
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5005
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Start the development server:
```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_API_URL=http://localhost:5005
```

Start the Vite development server:
```bash
npm run dev
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
