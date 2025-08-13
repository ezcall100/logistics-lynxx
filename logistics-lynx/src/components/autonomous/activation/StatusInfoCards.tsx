
import React from 'react';
import { Zap, Shield } from 'lucide-react';

interface StatusInfoCardsProps {
  isActive: boolean;
  isAutoActivated: boolean;
}

export const StatusInfoCards: React.FC<StatusInfoCardsProps> = ({ isActive, isAutoActivated }) => {
  return (
    <>
      {!isActive && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-800">Auto-Activation Available</span>
          </div>
          <p className="text-blue-700 text-sm">
            💡 System will automatically start 24/7 operation when you reload the page<br/>
            🔄 No manual button clicks needed - just refresh and it runs autonomously<br/>
            ⚡ True zero-touch autonomous operation
          </p>
        </div>
      )}

      {isActive && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-800">
              {isAutoActivated ? 'Auto-Running' : 'Manual'} Session Independent Operation
            </span>
          </div>
          <p className="text-blue-700 text-sm">
            ✅ System will continue running 24/7 even if TMS admin portal users log out<br/>
            ✅ Autonomous agents work independently of user authentication<br/>
            ✅ Operations persist across browser sessions and page refreshes<br/>
            {isAutoActivated && (
              <>✅ Auto-restarts on page reload - no manual activation needed</>
            )}
          </p>
        </div>
      )}
    </>
  );
};
