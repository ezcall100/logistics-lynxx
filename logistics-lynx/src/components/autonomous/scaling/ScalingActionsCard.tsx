
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScalingAction } from '@/hooks/useScalingActions';

interface ScalingActionsCardProps {
  scalingActions: ScalingAction[];
}

const ScalingActionsCard = ({ scalingActions }: ScalingActionsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Scaling Actions</CardTitle>
        <CardDescription>Latest autonomous scaling decisions and outcomes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {scalingActions.slice(0, 8).map((action) => (
            <div key={action.id} className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${action.success ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <div className="font-medium capitalize">
                    {action.type.replace('_', ' ')}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {action.trigger}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">
                  ${action.predicted_savings.toFixed(2)} savings
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(action.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {scalingActions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No scaling actions yet. System is monitoring demand patterns.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScalingActionsCard;
