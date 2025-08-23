import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();
  const href = typeof window !== "undefined" ? window.location.href : "";
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";

  return (
    <main style={{ padding: 24, fontFamily: "Inter, system-ui, Arial" }}>
      <h1>🚀 Trans Bot AI - Fixed!</h1>
      <p>React is working correctly!</p>
      <p><strong>Current Route:</strong> {location.pathname}</p>

      <Routes>
        <Route path="/" element={
          <div>
            <h2>🏠 Home Page</h2>
            <p>Welcome to Trans Bot AI!</p>
          </div>
        } />
        
        <Route path="/test" element={
          <div>
            <h2>🧪 Test Page</h2>
            <p>HashRouter is working!</p>
          </div>
        } />
        
        <Route path="*" element={
          <div>
            <h2>❓ Unknown Route</h2>
            <p>Route not found: {location.pathname}</p>
          </div>
        } />
      </Routes>

      <section style={{ marginTop: 16 }}>
        <h3>Debug</h3>
        <pre style={{ whiteSpace: "pre-wrap", background: "#f5f5f5", padding: 12 }}>
{`URL: ${href}
UserAgent: ${ua}
Current Path: ${location.pathname}`}
        </pre>
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Test Navigation</h3>
        <p>Try these URLs:</p>
        <ul>
          <li><a href="#/">Home</a></li>
          <li><a href="#/test">Test Page</a></li>
          <li><a href="#/unknown">Unknown Route</a></li>
        </ul>
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Next steps</h3>
        <ol>
          <li>✅ HashRouter is working</li>
          <li>🔄 Add portal routes (/super-admin, /carrier, etc.)</li>
          <li>🔄 Import portal components</li>
        </ol>
      </section>
    </main>
  );
}
