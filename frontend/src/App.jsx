import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SafetyMap from './pages/SafetyMap';
import Helpline from './pages/Helpline';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Forum from './pages/Forum';
import Community from './pages/Community';
import Profile from './pages/Profile';
import HelplineDirectory from './pages/HelplineDirectory';
import ChatbotWidget from './components/ChatbotWidget';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="app-main" style={{ paddingTop: '76px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Auth mode="signin" />} />
            <Route path="/signup" element={<Auth mode="signup" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/map" element={<SafetyMap />} />
            <Route path="/directory" element={<HelplineDirectory />} />
            <Route path="/helpline" element={<Helpline />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <ChatbotWidget />
      </div>
    </Router>
  );
}

export default App;
