import ROICalculator from '../../src/components/marketing/ROICalculator';

export default function ROIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculate Your ROI with Trans Bot AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See exactly how much you can save with faster quoting, higher win rates, and better margin discipline.
          </p>
        </div>
        
        <ROICalculator />
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Why Trans Bot AI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Faster Quoting</h3>
              <p className="text-sm text-gray-600">Reduce quote time from 15 minutes to under 2 minutes with AI-powered rate matching.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Higher Win Rates</h3>
              <p className="text-sm text-gray-600">Improve win rates by 5%+ with competitive pricing and instant responses.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Better Margins</h3>
              <p className="text-sm text-gray-600">Increase margins by 1.2%+ with intelligent pricing and market insights.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
