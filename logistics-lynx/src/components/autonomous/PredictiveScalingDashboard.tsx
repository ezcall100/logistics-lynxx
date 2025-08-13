
import { usePredictiveScaling } from '@/hooks/usePredictiveScaling';
import ScalingStatsCard from './scaling/ScalingStatsCard';
import CurrentResourcesCard from './scaling/CurrentResourcesCard';
import ScalingRecommendationsCard from './scaling/ScalingRecommendationsCard';
import DemandForecastCard from './scaling/DemandForecastCard';
import ScalingActionsCard from './scaling/ScalingActionsCard';

const PredictiveScalingDashboard = () => {
  const {
    currentResources,
    demandForecast,
    scalingActions,
    scalingActive,
    setScalingActive,
    scalingStats,
    getScalingRecommendations
  } = usePredictiveScaling();

  const recommendations = getScalingRecommendations();

  return (
    <div className="space-y-6">
      <ScalingStatsCard 
        scalingStats={scalingStats}
        scalingActive={scalingActive}
        setScalingActive={setScalingActive}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CurrentResourcesCard currentResources={currentResources} />
        <ScalingRecommendationsCard recommendations={recommendations} />
      </div>

      <DemandForecastCard demandForecast={demandForecast} />
      <ScalingActionsCard scalingActions={scalingActions} />
    </div>
  );
};

export default PredictiveScalingDashboard;
