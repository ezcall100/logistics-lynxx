import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const ShipperPortal = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">📦 Shipper Portal</h1>
        <p className="text-lg text-gray-600 mb-8">
          Streamlined logistics and shipment tracking dashboard
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Shipment Tracking</h3>
            <p className="text-gray-600">Track your shipments in real-time</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Cost Analysis</h3>
            <p className="text-gray-600">Analyze shipping costs and optimize</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Performance Reports</h3>
            <p className="text-gray-600">View detailed performance metrics</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShipperPortal;
