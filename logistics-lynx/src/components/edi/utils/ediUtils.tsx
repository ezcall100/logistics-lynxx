
import { Badge } from '@/components/ui/badge';

export const getStatusBadge = (status: string) => {
  const baseClasses = "font-medium text-xs px-2.5 py-1 rounded-full border transition-all duration-200";
  
  switch (status) {
    case 'matched':
      return (
        <Badge className={`${baseClasses} bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800`}>
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></div>
          Matched
        </Badge>
      );
    case 'pending':
      return (
        <Badge className={`${baseClasses} bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800`}>
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5 animate-pulse"></div>
          Pending
        </Badge>
      );
    case 'unmatched':
      return (
        <Badge className={`${baseClasses} bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800`}>
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></div>
          Unmatched
        </Badge>
      );
    case 'delivered':
      return (
        <Badge className={`${baseClasses} bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800`}>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5"></div>
          Delivered
        </Badge>
      );
    case 'in_transit':
      return (
        <Badge className={`${baseClasses} bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800`}>
          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1.5 animate-bounce-subtle"></div>
          In Transit
        </Badge>
      );
    default:
      return (
        <Badge className={`${baseClasses} bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800`}>
          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1.5"></div>
          Unknown
        </Badge>
      );
  }
};
