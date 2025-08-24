import React from 'react';

// Simple test component to see if React is working
const TestComponent = () => (
  <div className="min-h-screen flex items-center justify-center bg-blue-50">
    <div className="text-center space-y-6 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-blue-600">
        🏢 TMS Enterprise Platform
      </h1>
      <p className="text-lg text-gray-600">
        Application is loading successfully!
      </p>
      <div className="text-sm text-gray-500">
        <p>React and Tailwind CSS are working</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <TestComponent />
    </div>
  );
}

export default App;
