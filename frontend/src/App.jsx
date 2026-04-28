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

export default App;