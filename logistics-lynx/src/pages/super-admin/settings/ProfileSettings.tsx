import React from 'react';

const ProfileSettings: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>Profile Settings</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>This is a test page to verify routing is working.</p>
        
        <div style={{ backgroundColor: '#e8f5e8', border: '1px solid #4caf50', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
          ✅ <strong>Success!</strong> The ProfileSettings component is loading correctly.
        </div>
        
        <div style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107', padding: '15px', borderRadius: '4px' }}>
          <h3>Test Information:</h3>
          <ul>
            <li>Component: ProfileSettings</li>
            <li>Route: /super-admin/settings/profile</li>
            <li>Status: Working</li>
            <li>Time: {new Date().toLocaleString()}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
