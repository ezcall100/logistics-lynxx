import React from "react";

export default function App() {
  const href = typeof window !== "undefined" ? window.location.href : "";
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";

  return (
    <main style={{ padding: 24, fontFamily: "Inter, system-ui, Arial" }}>
      <h1>🚀 Trans Bot AI - Fixed!</h1>
      <p>React is working correctly!</p>

      <section style={{ marginTop: 16 }}>
        <h3>Debug</h3>
        <pre style={{ whiteSpace: "pre-wrap", background: "#f5f5f5", padding: 12 }}>
{`URL: ${href}
UserAgent: ${ua}`}
        </pre>
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Status</h3>
        <p>✅ Basic React setup working</p>
        <p>🔄 Routing to be added back</p>
      </section>
    </main>
  );
}
