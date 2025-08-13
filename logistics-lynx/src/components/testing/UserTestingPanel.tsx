
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Play, 
  Square, 
  CheckCircle, 
  Clock, 
  MessageSquare,
  Star,
  User
} from 'lucide-react';
import { useUserTesting } from '@/hooks/useUserTesting';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const UserTestingPanel = () => {
  const { user, selectedRole } = useAuth();
  const { toast } = useToast();
  const {
    currentSession,
    isRecording,
    testingTasks,
    startTestingSession,
    endTestingSession,
    completeTask,
    submitFeedback
  } = useUserTesting();

  const [feedbackForm, setFeedbackForm] = useState({
    feature: '',
    rating: 5,
    comments: '',
    category: 'usability' as const
  });

  const handleStartTesting = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to start testing session",
        variant: "destructive"
      });
      return;
    }

    await startTestingSession(user.id, selectedRole);
    toast({
      title: "Testing Session Started",
      description: "Your testing session is now being recorded",
    });
  };

  const handleEndTesting = async () => {
    await endTestingSession();
    toast({
      title: "Testing Session Completed",
      description: "Thank you for your feedback! Your session has been saved.",
    });
  };

  const handleCompleteTask = async (taskId: string) => {
    await completeTask(taskId);
    toast({
      title: "Task Completed",
      description: "Task marked as completed successfully",
    });
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackForm.feature || !feedbackForm.comments) {
      toast({
        title: "Incomplete Feedback",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    await submitFeedback(feedbackForm);
    setFeedbackForm({
      feature: '',
      rating: 5,
      comments: '',
      category: 'usability'
    });
    
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your valuable feedback!",
    });
  };

  const completionProgress = currentSession 
    ? (currentSession.completedTasks.length / testingTasks.length) * 100 
    : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Testing Framework
            {isRecording && (
              <Badge variant="destructive" className="animate-pulse">
                Recording
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isRecording ? (
            <Button onClick={handleStartTesting} className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Start Testing Session
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Session Progress: {currentSession?.completedTasks.length} / {testingTasks.length} tasks
                </span>
                <Button onClick={handleEndTesting} variant="outline" className="flex items-center gap-2">
                  <Square className="h-4 w-4" />
                  End Session
                </Button>
              </div>
              <Progress value={completionProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {isRecording && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Testing Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {testingTasks.map((task) => {
                const isCompleted = currentSession?.completedTasks.includes(task.id);
                return (
                  <div key={task.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{task.name}</h4>
                        <Badge variant={isCompleted ? "default" : "secondary"}>
                          {task.category.replace('_', ' ')}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {task.estimatedDuration}min
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                      <p className="text-xs text-blue-600">Expected: {task.expectedOutcome}</p>
                    </div>
                    <Button
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={isCompleted}
                      variant={isCompleted ? "outline" : "default"}
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Done
                        </>
                      ) : (
                        'Complete'
                      )}
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Feedback Form
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Feature</Label>
                  <select
                    value={feedbackForm.feature}
                    onChange={(e) => setFeedbackForm(prev => ({ ...prev, feature: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select feature...</option>
                    <option value="quote_comparison">Quote Comparison</option>
                    <option value="margin_analysis">Margin Analysis</option>
                    <option value="ai_recommendations">AI Recommendations</option>
                    <option value="pdf_export">PDF Export</option>
                    <option value="filters">Advanced Filters</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select
                    value={feedbackForm.category}
                    onChange={(e) => setFeedbackForm(prev => ({ ...prev, category: e.target.value as unknown }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="usability">Usability</option>
                    <option value="functionality">Functionality</option>
                    <option value="ai_accuracy">AI Accuracy</option>
                    <option value="performance">Performance</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="sm"
                      onClick={() => setFeedbackForm(prev => ({ ...prev, rating: star }))}
                      className="p-1"
                    >
                      <Star 
                        className={`h-4 w-4 ${star <= feedbackForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    </Button>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {feedbackForm.rating}/5
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Comments</Label>
                <Textarea
                  value={feedbackForm.comments}
                  onChange={(e) => setFeedbackForm(prev => ({ ...prev, comments: e.target.value }))}
                  placeholder="Please share your detailed feedback about this feature..."
                  rows={4}
                />
              </div>

              <Button onClick={handleSubmitFeedback} className="w-full">
                Submit Feedback
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
