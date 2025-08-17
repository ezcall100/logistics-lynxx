import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const CarrierPortal = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">🚛 Carrier Portal</h1>
        <p className="text-lg text-gray-600 mb-8">
          Fleet management and operations with intelligent dispatch
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Fleet Management</h3>
            <p className="text-gray-600">Manage your fleet operations efficiently</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Load Operations</h3>
            <p className="text-gray-600">Track and manage load assignments</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Driver Tracking</h3>
            <p className="text-gray-600">Monitor driver status and performance</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarrierPortal;
