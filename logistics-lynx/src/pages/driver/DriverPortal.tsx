import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const DriverPortal = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">🚗 Driver Portal</h1>
        <p className="text-lg text-gray-600 mb-8">
          Personalized driving command center with HOS tracking
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Hours of Service</h3>
            <p className="text-gray-600">Track and manage your HOS compliance</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Route Planning</h3>
            <p className="text-gray-600">Optimize your routes and navigation</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Load Details</h3>
            <p className="text-gray-600">Access detailed load information</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DriverPortal;
