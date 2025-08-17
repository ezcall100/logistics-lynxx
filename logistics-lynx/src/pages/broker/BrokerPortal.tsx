import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const BrokerPortal = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">🏢 Broker Portal</h1>
        <p className="text-lg text-gray-600 mb-8">
          Smart load matching and rate optimization platform
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Load Board</h3>
            <p className="text-gray-600">Access and manage available loads</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Rate Management</h3>
            <p className="text-gray-600">Optimize rates and margins</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Carrier Network</h3>
            <p className="text-gray-600">Manage carrier relationships</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BrokerPortal;
