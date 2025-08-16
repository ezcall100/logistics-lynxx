/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

export const RateCalculator = () => {
  const [email, setEmail] = useState('');
  const [lanes, setLanes] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [savings, setSavings] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    try {
      // Calculate estimated savings
      const estimatedSavings = parseInt(lanes) * 1500; // $1500 per lane
      setSavings(estimatedSavings);

      // Create trial account
      const trial = await fetch('/api/trials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lanes, estimatedSavings })
      }).then(r => r.json());

      // Redirect to trial setup
      window.location.href = `/signup?trial=${trial.id}`;
    } catch (error) {
      console.error('Error creating trial:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">Calculate Your Savings</h3>
      
      {savings && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 font-semibold">
            Estimated Annual Savings: <span className="text-2xl">${savings.toLocaleString()}</span>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Lanes
          </label>
          <input
            type="number"
            placeholder="e.g., 5"
            value={lanes}
            onChange={(e) => setLanes(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            required
          />
        </div>

        <button 
          type="submit"
          disabled={isCalculating}
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isCalculating ? 'Calculating...' : 'Calculate & Start Free Trial'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>✓ 14-day free trial</p>
        <p>✓ No credit card required</p>
        <p>✓ Cancel anytime</p>
      </div>
    </div>
  );
};
