
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useAutonomousKnowledge } from '@/hooks/useAutonomousKnowledge';
import { Brain, Database, TrendingUp, History, Lightbulb, Activity, Settings, RotateCcw } from 'lucide-react';

const AutonomousKnowledgeBase = () => {
  const {
    knowledgeRules,
    discoveredPatterns,
    knowledgeVersions,
    currentVersion,
    performanceMetrics,
    isLearning,
    lastAnalysis,
    setIsLearning,
    createKnowledgeVersion,
    rollbackToVersion,
    toggleRule
  } = useAutonomousKnowledge();

  return (
    <div className="space-y-6">
      {/* Knowledge Base Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <CardTitle>Autonomous Knowledge Base</CardTitle>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="learning-mode" className="text-sm font-medium">
                  Learning Mode
                </label>
                <Switch
                  id="learning-mode"
                  checked={isLearning}
                  onCheckedChange={setIsLearning}
                />
                <Badge variant={isLearning ? "default" : "secondary"}>
                  {isLearning ? "ACTIVE" : "PAUSED"}
                </Badge>
              </div>
            </div>
          </div>
          <CardDescription>
            Continuously learning and evolving operational rules from real-world data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span className="text-sm font-medium">Active Rules</span>
              </div>
              <div className="text-2xl font-bold">{knowledgeRules.filter(r => r.is_active).length}</div>
              <div className="text-xs text-muted-foreground">
                {knowledgeRules.filter(r => r.auto_generated).length} auto-generated
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span className="text-sm font-medium">Patterns Found</span>
              </div>
              <div className="text-2xl font-bold">{discoveredPatterns.length}</div>
              <div className="text-xs text-muted-foreground">
                {discoveredPatterns.filter(p => p.confidence > 0.8).length} high confidence
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Efficiency Score</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{performanceMetrics.efficiency_score.toFixed(1)}%</div>
              <Progress value={performanceMetrics.efficiency_score} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4" />
                <span className="text-sm font-medium">Version</span>
              </div>
              <div className="text-2xl font-bold">{currentVersion?.version_number || 1}</div>
              <div className="text-xs text-muted-foreground">
                {knowledgeVersions.length} total versions
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className="text-sm font-medium">Last Analysis</span>
              </div>
              <div className="text-sm font-medium">
                {lastAnalysis ? new Date(lastAnalysis).toLocaleTimeString() : 'Running...'}
              </div>
              <div className="text-xs text-muted-foreground">Continuous learning</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Impact Metrics</CardTitle>
          <CardDescription>
            Real-time performance improvements from autonomous knowledge updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(performanceMetrics).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <span className="text-sm font-medium capitalize">
                  {key.replace('_', ' ')}
                </span>
                <div className="text-lg font-bold text-blue-600">
                  {key.includes('score') || key.includes('speed') ? `${value.toFixed(1)}%` : `+${value.toFixed(1)}%`}
                </div>
                <Progress value={Math.min(100, value)} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Knowledge Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Knowledge Rules</CardTitle>
              <Button onClick={createKnowledgeVersion} size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Create Version
              </Button>
            </div>
            <CardDescription>
              Operational rules learned and generated by the AI system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {knowledgeRules.slice(0, 6).map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{rule.name}</span>
                      {rule.auto_generated && (
                        <Badge variant="outline" className="text-xs">
                          Auto-Generated
                        </Badge>
                      )}
                      <Badge variant={rule.is_active ? "default" : "secondary"} className="text-xs">
                        {rule.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {rule.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>Confidence: {(rule.confidence_score * 100).toFixed(1)}%</span>
                      <span>Impact: +{rule.performance_impact.toFixed(1)}%</span>
                      <span>Used: {rule.usage_count} times</span>
                    </div>
                  </div>
                  <Switch
                    checked={rule.is_active}
                    onCheckedChange={() => toggleRule(rule.id)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Pattern Discoveries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Pattern Discoveries</CardTitle>
            <CardDescription>
              Newly identified patterns from operational data analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {discoveredPatterns.slice(0, 6).map((pattern) => (
                <div key={pattern.id} className="p-3 border rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium capitalize">
                      {pattern.pattern_type.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {(pattern.confidence * 100).toFixed(1)}% confidence
                      </Badge>
                      {pattern.rule_generated && (
                        <Badge className="text-xs">Rule Generated</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Impact Score: {pattern.impact_score.toFixed(1)} | Frequency: {pattern.frequency}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Discovered: {new Date(pattern.discovered_at).toLocaleString()}
                  </div>
                </div>
              ))}
              {discoveredPatterns.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No patterns discovered yet. Analysis in progress...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Version History */}
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Base Version History</CardTitle>
          <CardDescription>
            Track changes and performance impact of knowledge base updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {knowledgeVersions.map((version) => (
              <div key={version.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">Version {version.version_number}</span>
                    {version.is_active && (
                      <Badge className="text-xs">Current</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {version.changes_summary}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Performance: {version.performance_before.toFixed(1)}% → {version.performance_after.toFixed(1)}%
                    {' '}({version.performance_after > version.performance_before ? '+' : ''}{(version.performance_after - version.performance_before).toFixed(1)}%)
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right text-sm">
                    <div>{version.rules_count} rules</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(version.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  {!version.is_active && (
                    <Button
                      onClick={() => rollbackToVersion(version)}
                      size="sm"
                      variant="outline"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutonomousKnowledgeBase;
