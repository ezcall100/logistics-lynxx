import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const OwnerOperatorPortal = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">🚚 Owner Operator Portal</h1>
        <p className="text-lg text-gray-600 mb-8">
          Independent trucking business management hub
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Revenue Tracking</h3>
            <p className="text-gray-600">Track your revenue and earnings</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Expense Management</h3>
            <p className="text-gray-600">Manage your business expenses</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Load Efficiency</h3>
            <p className="text-gray-600">Optimize your load efficiency</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OwnerOperatorPortal;
