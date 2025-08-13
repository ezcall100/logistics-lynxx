import React from 'react';
import { useLocation } from 'react-router-dom';
import WorkersOverview from './WorkersOverview';
import ExecutiveTeam from './ExecutiveTeam';
import Employees from './Employees';
import SalesAgents from './SalesAgents';
import Departments from './Departments';
import Performance from './Performance';
import PayrollBenefits from './PayrollBenefits';
import TrainingDevelopment from './TrainingDevelopment';

const WorkersPage = () => {
  const location = useLocation();
  
  // Determine which component to render based on current route
  const getCurrentComponent = () => {
    const path = location.pathname;
    if (path.includes('/executive')) return 'executive';
    if (path.includes('/employees')) return 'employees';
    if (path.includes('/agents')) return 'agents';
    if (path.includes('/departments')) return 'departments';
    if (path.includes('/performance')) return 'performance';
    if (path.includes('/payroll')) return 'payroll';
    if (path.includes('/training')) return 'training';
    if (path.endsWith('/workers') || path.endsWith('/workers/')) return 'overview';
    return 'overview'; // default to overview
  };

  const currentSection = getCurrentComponent();
  
  console.log('Current section:', currentSection);
  console.log('Current path:', location.pathname);

  const renderCurrentComponent = () => {
    console.log('Rendering section:', currentSection);
    switch (currentSection) {
      case 'overview':
        return <WorkersOverview />;
      case 'executive':
        return <ExecutiveTeam />;
      case 'employees':
        return <Employees />;
      case 'agents':
        return <SalesAgents />;
      case 'departments':
        return <Departments />;
      case 'performance':
        return <Performance />;
      case 'payroll':
        return <PayrollBenefits />;
      case 'training':
        return <TrainingDevelopment />;
      default:
        return <WorkersOverview />;
    }
  };

  return (
    <div>
      {renderCurrentComponent()}
    </div>
  );
};

export default WorkersPage;