import { useState } from "react";
import bg from "./assets/bg.jpeg";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const checkURL = async () => {
    if (!url) {
      alert("Enter URL first");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      // 👇 Handle backend errors properly
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      const data = await res.json();

      // 👇 Show better result
      setResult(
        `${data.prediction.toUpperCase()} (Confidence: ${(data.confidence * 100).toFixed(2)}%)`
      );
    } catch (err) {
      console.error(err);
      setResult("❌ Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      
      {/* Background */}
      <div
        style={{
          ...styles.background,
          backgroundImage: `url(${bg})`,
        }}
      ></div>

      {/* Overlay */}
      <div style={styles.overlay}></div>

      {/* Content */}
      <div style={styles.container}>
        <h1>🔐 Hack the ads</h1>

        <input
          type="text"
          placeholder="Enter URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />

        <button onClick={checkURL} style={styles.button}>
          {loading ? "Checking..." : "Check URL"}
        </button>

        {result && <h2 style={styles.result}>{result}</h2>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Arial",
  },

  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    zIndex: 1,
  },

  container: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    top: "30%",
    color: "white",
  },

  input: {
    padding: "12px",
    width: "300px",
    margin: "10px",
    borderRadius: "5px",
    border: "none",
  },

  button: {
    padding: "12px 20px",
    backgroundColor: "orange",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },

  result: {
    marginTop: "20px",
    color: "#fff",
  },
};

export default App;import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, Search } from 'lucide-react';
import URLChecker from './URLChecker';
import Dashboard from './Dashboard';

// Navigation Component (Redesigned as Top Bar)
const TopBar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      background: '#fff',
      borderBottom: '1px solid #e0e6ed',
      padding: '0.8rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
    }}>
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1F509A 0%, #0A3981 100%)',
          padding: '8px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Shield size={24} color="white" />
        </div>
        <div>
          {/* UPDATED NAME HERE */}
          <h1 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0A3981', margin: 0, lineHeight: 1 }}>
            PHISH<span style={{ color: '#E38E49' }}>NET</span>
          </h1>
          <p style={{ fontSize: '0.75rem', color: '#6a7486', margin: 0, letterSpacing: '0.05em' }}>
            AI THREAT INTELLIGENCE
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button className={`btn ${isActive('/') ? 'btn-primary' : 'btn-secondary'}`} style={{ 
            padding: '0.5rem 1rem', 
            fontSize: '0.9rem',
            background: isActive('/') ? 'var(--primary-gradient)' : 'transparent',
            color: isActive('/') ? 'white' : '#6a7486',
            border: isActive('/') ? 'none' : '1px solid transparent'
          }}>
            <LayoutDashboard size={16} /> Dashboard
          </button>
        </Link>
        
        <Link to="/check" style={{ textDecoration: 'none' }}>
          <button className={`btn ${isActive('/check') ? 'btn-primary' : 'btn-secondary'}`} style={{ 
            padding: '0.5rem 1rem', 
            fontSize: '0.9rem',
            background: isActive('/check') ? 'var(--primary-gradient)' : 'transparent',
            color: isActive('/check') ? 'white' : '#6a7486',
            border: isActive('/check') ? 'none' : '1px solid transparent'
          }}>
            <Search size={16} /> URL Scanner
          </button>
        </Link>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer style={{
    textAlign: 'center',
    padding: '2rem',
    color: '#6a7486',
    fontSize: '0.85rem',
    borderTop: '1px solid #e0e6ed',
    marginTop: 'auto',
    background: '#fff'
  }}>
    <p>© 2025 PhishNet AI. Powered by LightGBM & FastAPI.</p>
  </footer>
);

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TopBar />
        <main style={{ flex: 1, padding: '2rem 1rem' }}>
          <div className="container" style={{ maxWidth: '1100px' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/check" element={<URLChecker />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
